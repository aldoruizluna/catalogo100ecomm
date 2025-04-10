import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix: ES Modules compatible path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbDir = join(__dirname);
const dbPath = join(dbDir, 'dev.db');

// Ensure directory exists
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');

// Create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    duration INTEGER,
    instructor TEXT,
    created_at INTEGER
  );
`);

const db = drizzle(sqlite, { schema });

export default db;
