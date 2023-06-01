import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { User, users } from './schema/users';
import { Posts, posts } from './schema/posts';

const sqlite = new Database('sqlite.db');
export const db: BetterSQLite3Database = drizzle(sqlite);

migrate(db, { migrationsFolder: 'drizzle' });
