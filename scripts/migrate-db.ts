import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { neon } from '@neondatabase/serverless';
import * as schema from '../server/schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  try {
    console.log('Starting database migration...');

    // Initialize database connection
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    // Run migrations
    await migrate(db, {
      migrationsFolder: './drizzle',
    });

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

runMigration(); 