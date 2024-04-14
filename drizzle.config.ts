import type { Config } from "drizzle-kit";
export default {
  schema: "./src/app/lib/database/schema.ts",
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  }
} 