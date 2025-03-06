import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get("/api/categories/:slug", async (req, res) => {
    const category = await storage.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  });

  // Items
  app.get("/api/categories/:categoryId/items", async (req, res) => {
    const items = await storage.getItems(parseInt(req.params.categoryId));
    res.json(items);
  });

  app.get("/api/items/:slug", async (req, res) => {
    const item = await storage.getItemBySlug(req.params.slug);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = insertBookingSchema.parse(req.body);
      const created = await storage.createBooking(booking);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
