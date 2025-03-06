import { categories, items, bookings, type Category, type Item, type Booking, type InsertCategory, type InsertItem, type InsertBooking } from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // Items
  getItems(categoryId: number): Promise<Item[]>;
  getItemBySlug(slug: string): Promise<Item | undefined>;
  
  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private items: Map<number, Item>;
  private bookings: Map<number, Booking>;
  private currentIds: { categories: number; items: number; bookings: number };

  constructor() {
    this.categories = new Map();
    this.items = new Map();
    this.bookings = new Map();
    this.currentIds = { categories: 1, items: 1, bookings: 1 };
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCategories: InsertCategory[] = [
      {
        name: "Adventures",
        slug: "adventures",
        description: "Exciting activities in Cabo",
        imageUrl: "/images/adventures.jpg"
      },
      {
        name: "Stays",
        slug: "stays",
        description: "Luxury accommodations",
        imageUrl: "/images/stays.jpg"
      }
    ];

    sampleCategories.forEach(cat => {
      const id = this.currentIds.categories++;
      this.categories.set(id, { ...cat, id });
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async getItems(categoryId: number): Promise<Item[]> {
    return Array.from(this.items.values()).filter(item => item.categoryId === categoryId);
  }

  async getItemBySlug(slug: string): Promise<Item | undefined> {
    return Array.from(this.items.values()).find(item => item.slug === slug);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentIds.bookings++;
    const booking = { ...insertBooking, id };
    this.bookings.set(id, booking);
    return booking;
  }
}

export const storage = new MemStorage();
