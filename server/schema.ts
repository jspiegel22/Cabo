import { pgTable, serial, text, timestamp, boolean, integer, decimal, jsonb, date } from 'drizzle-orm/pg-core';

// Users table for authentication and profiles
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('user'),
  phone: text('phone'),
  avatar: text('avatar_url'),
  preferences: jsonb('preferences'),
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
  coordinates: jsonb('coordinates'), // { lat: number, lng: number }
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  maxGuests: integer('max_guests'),
  amenities: jsonb('amenities'),
  images: jsonb('images'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  policies: jsonb('policies'), // cancellation, check-in/out, etc.
  source: text('source'), // e.g., "CaboVillas.com", "Airbnb"
  sourceUrl: text('source_url'),
  featured: boolean('featured').default(false),
  availability: jsonb('availability'), // calendar of available dates
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
  policies: jsonb('policies'),
  requirements: jsonb('requirements'), // safety requirements, documentation
  source: text('source'), // e.g., "Papillon Yachts"
  sourceUrl: text('source_url'),
  featured: boolean('featured').default(false),
  availability: jsonb('availability'),
  dockLocation: text('dock_location'),
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
  minParticipants: integer('min_participants'),
  maxParticipants: integer('max_participants'),
  location: text('location'),
  meetingPoint: text('meeting_point'),
  coordinates: jsonb('coordinates'),
  includes: jsonb('includes'),
  excludes: jsonb('excludes'),
  requirements: jsonb('requirements'),
  recommended: jsonb('recommended'), // what to bring
  cancellationPolicy: text('cancellation_policy'),
  images: jsonb('images'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  source: text('source'), // e.g., "Cabo Adventures"
  sourceUrl: text('source_url'),
  featured: boolean('featured').default(false),
  availability: jsonb('availability'),
  seasonalPricing: jsonb('seasonal_pricing'),
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
  coordinates: jsonb('coordinates'),
  openingHours: jsonb('opening_hours'),
  menu: jsonb('menu'),
  images: jsonb('images'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  features: jsonb('features'), // e.g., outdoor seating, view
  dressCode: text('dress_code'),
  reservationRequired: boolean('reservation_required'),
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
  title: text('title'),
  comment: text('comment'),
  images: jsonb('images'),
  verified: boolean('verified').default(false),
  helpful: integer('helpful_count').default(0),
  reported: boolean('reported').default(false),
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
  specialRequests: text('special_requests'),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull().default('pending'), // pending, confirmed, cancelled
  paymentStatus: text('payment_status').notNull().default('pending'),
  paymentMethod: text('payment_method'),
  transactionId: text('transaction_id'),
  cancellationReason: text('cancellation_reason'),
  refundAmount: decimal('refund_amount', { precision: 10, scale: 2 }),
  contactInfo: jsonb('contact_info'), // additional contact information
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Chat Sessions for AI Chatbot
export const chatSessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  messages: jsonb('messages').default('[]'),
  context: jsonb('context'), // user preferences, search history
  lastInteraction: timestamp('last_interaction').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Availability Calendar
export const availability = pgTable('availability', {
  id: serial('id').primaryKey(),
  entityId: integer('entity_id').notNull(),
  entityType: text('entity_type').notNull(),
  date: date('date').notNull(),
  availableSlots: integer('available_slots'),
  bookedSlots: integer('booked_slots').default(0),
  price: decimal('price', { precision: 10, scale: 2 }),
  isBlocked: boolean('is_blocked').default(false),
  blockReason: text('block_reason'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}); 