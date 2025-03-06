import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { neon } from '@neondatabase/serverless';
import * as schema from '../server/schema';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// Generate migrations
async function generateMigrations() {
  try {
    console.log('Generating migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations generated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error generating migrations:', error);
    process.exit(1);
  }
}

generateMigrations(); 