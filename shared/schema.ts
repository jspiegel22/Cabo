import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  price: text("price"),
  images: text("images").array(),
  details: jsonb("details"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  date: text("date").notNull(),
  guests: integer("guests").notNull(),
  message: text("message"),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });
export const insertItemSchema = createInsertSchema(items).omit({ id: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertItem = z.infer<typeof insertItemSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Booking = typeof bookings.$inferSelect;
export type Item = typeof items.$inferSelect;
export type Category = typeof categories.$inferSelect;
