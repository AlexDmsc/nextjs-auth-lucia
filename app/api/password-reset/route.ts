import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database/db";
import { eq } from "drizzle-orm";
import { resetPasswordTable, userTable } from "@/lib/database/schema";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { encodeHex } from "oslo/encoding";
import { sha256 } from "oslo/crypto";
import { isWithinExpirationDate } from "oslo";

export const POST = async (req: NextRequest) => {
  try {
    const requestData = await req.json();
    const { tokenId, password } = requestData;

    if (!tokenId) {
      return Response.json(
        {
          error: "Token is not existed",
        },
        {
          status: 400,
        }
      );
    }

    const tokenHash = encodeHex(
      await sha256(new TextEncoder().encode(tokenId))
    );

    const userTokenResult = await db.query.resetPasswordTable.findFirst({
      where: (table) => eq(table.tokenHash, tokenHash),
    });

    if (
      !userTokenResult ||
      !isWithinExpirationDate(userTokenResult.expiresAt)
    ) {
      return Response.json(
        {
          error: "Invalid token or expiration date is passed",
        },
        {
          status: 400,
        }
      );
    }

    await lucia.invalidateUserSessions(userTokenResult.userId);
    const hashedPassword = await new Argon2id().hash(password);

    await db
      .update(userTable)
      .set({ password: hashedPassword })
      .where(eq(userTable.id, userTokenResult.userId));

    const session = await lucia.createSession(userTokenResult.userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    await db
      .delete(resetPasswordTable)
      .where(eq(resetPasswordTable.userId, userTokenResult.userId))
      .execute();

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": sessionCookie.serialize(),
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (e: any) {
    return Response.json(
      {
        error: e.message,
      },
      {
        status: 400,
      }
    );
  }
};
