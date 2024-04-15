"use server";
import { z } from "zod";
import { SignUpSchema } from "@/types/index";
import { SignInSchema } from "@/types/index";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import db from "@/lib/database/db";
import { userTable } from "@/lib/database/schema";
import { lucia, getUserSession } from "@/lib/lucia";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const hashedPassword = await new Argon2id().hash(data.password);
  const userId = generateId(15);

  try {
    await db.insert(userTable).values({
      id: userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
    });

    const session = lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 1000, // 24 hours
    });

    const sessionCookie = lucia.createSessionCookie((await session).id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (data: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(data);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  const user = await db.query.userTable.findFirst({
    where: (table) => eq(table.email, data.email),
  });

  if (!user) {
    return {
      error: "User not found. Please sign up first.",
    };
  }

  if (!user.password) {
    return {
      error: "User not found, please sign up first.",
    };
  }

  const isValidPassword = await new Argon2id().verify(
    user.password,
    data.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  const session = lucia.createSession(user.id, {
    expiresIn: 60 * 60 * 24 * 1000, // 24 hours
  });

  const sessionCookie = lucia.createSessionCookie((await session).id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: "Login successful",
  };
};

export const signOut = async () => {

  try {
    const session = await getUserSession();

  if (!session) {
    return {
      error: "No session found",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }

}

export const resetPassword = async (email: string) => {
  const user = await db.query.userTable.findFirst({
    where: (table) => eq(table.email, email),
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  // Send password reset link to user email

  return {
    success: "Password reset link sent to your email",
  };
}