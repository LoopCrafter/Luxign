import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  imageUrl: varchar().notNull(),
  credit: integer().default(3),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  lastVisitTime: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export const AiGeneratedImage = pgTable("aiGeneratedImage", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  originalImage: varchar("originalImage").notNull(),
  aiImage: varchar("aiImage").notNull(),
  userEmail: varchar("userEmail", { length: 255 }).notNull(),
});
