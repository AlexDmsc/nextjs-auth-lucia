import db from "@/lib/database/db";
import { eq } from "drizzle-orm";

export const getUser = async (id: string) => {
  const user = await db.query.userTable.findFirst({
    where: (table) => eq(table.id, id),
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  return { userData: user };
};

export const setUser = async (id: string) => {
  const user = await db.query.userTable.findFirst({
    where: (table) => eq(table.id, id),
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  return { userData: user };
};

