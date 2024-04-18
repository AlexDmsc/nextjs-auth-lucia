import { mysqlTable, varchar, datetime } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  firstName: varchar("first_name", {
    length: 255,
  }).notNull(),
  lastName: varchar("last_name", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  }).notNull(),
  password: varchar("password", {
    length: 255,
  }).notNull(),
});

export const sessionTable = mysqlTable("session", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 255,
  })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});

export const resetPasswordTable = mysqlTable("reset_password_token", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  tokenHash: varchar("token_hash", {
    length: 255,
  }).notNull(),
  userId: varchar("user_id", {
    length: 255,
  })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});
