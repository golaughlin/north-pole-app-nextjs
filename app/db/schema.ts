import "dotenv/config";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { seed } from "drizzle-seed";

// Create children table
export const children = sqliteTable("children", {
  id: int().primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: int("date_of_birth", { mode: "timestamp" }).notNull(),
  hometown: text(),
  isNice: int("is_nice", { mode: "boolean" }).notNull(),
  dateCreated: int("date_created", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  dateUpdated: int("date_updated", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

// Seed children table with example children
async function generateChildren() {
  const db = drizzle(process.env.DB_FILE_NAME!);
  await seed(db, { children }).refine((f) => ({
    children: {
      count: 200,
      columns: {
        firstName: f.firstName(),
        lastName: f.lastName(),
        dateOfBirth: f.date({ minDate: "2013-01-01", maxDate: "2022-01-01" }),
        hometown: f.city(),
        isNice: f.boolean(),
      }
    }
  }));
}

generateChildren();