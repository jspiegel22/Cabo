import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

// Create Drizzle database instance
export const db = drizzle(sql, { schema });

// Export schema for use in other files
export { schema }; 