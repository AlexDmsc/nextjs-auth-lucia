import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from "../database/db";
import { sessionTable, userTable } from "../database/schema";


const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);
export default adapter;