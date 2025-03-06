import { pgTable, serial, text, timestamp, boolean, integer, decimal, jsonb } from 'drizzle-orm/pg-core';

// Users table for authentication and profiles
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Properties (Villas, Hotels, Resorts)
export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // villa, hotel, resort
  description: text('description').notNull(),
  location: text('location').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  maxGuests: integer('max_guests'),
  amenities: jsonb('amenities'),
  images: jsonb('images'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  source: text('source'), // e.g., "CaboVillas.com", "Airbnb"
  sourceUrl: text('source_url'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Yachts
export const yachts = pgTable('yachts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  capacity: integer('capacity').notNull(),
  length: decimal('length', { precision: 5, scale: 2 }),
  crew: integer('crew'),
  pricePerHour: decimal('price_per_hour', { precision: 10, scale: 2 }),
  pricePerDay: decimal('price_per_day', { precision: 10, scale: 2 }),
  amenities: jsonb('amenities'),
  images: jsonb('images'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  source: text('source'), // e.g., "Papillon Yachts"
  sourceUrl: text('source_url'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Adventures/Activities
export const adventures = pgTable('adventures', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  duration: text('duration').notNull(),
  difficulty: text('difficulty'),
  pricePerPerson: decimal('price_per_person', { precision: 10, scale: 2 }).notNull(),
  location: text('location'),
  includes: jsonb('includes'),
  images: jsonb('images'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  source: text('source'), // e.g., "Cabo Adventures"
  sourceUrl: text('source_url'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Restaurants
export const restaurants = pgTable('restaurants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  cuisine: text('cuisine').notNull(),
  priceRange: text('price_range').notNull(),
  location: text('location').notNull(),
  openingHours: jsonb('opening_hours'),
  images: jsonb('images'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  source: text('source'), // e.g., "OpenTable"
  sourceUrl: text('source_url'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  entityId: integer('entity_id').notNull(),
  entityType: text('entity_type').notNull(), // property, yacht, adventure, restaurant
  rating: integer('rating').notNull(),
  comment: text('comment'),
  images: jsonb('images'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Bookings
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  entityId: integer('entity_id').notNull(),
  entityType: text('entity_type').notNull(), // property, yacht, adventure, restaurant
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  numberOfGuests: integer('number_of_guests').notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('pending'), // pending, confirmed, cancelled
  paymentStatus: text('payment_status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Chat Sessions for AI Chatbot
export const chatSessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  messages: jsonb('messages').default('[]'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}); 