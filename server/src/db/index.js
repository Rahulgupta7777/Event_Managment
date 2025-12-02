import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema.js';
import 'dotenv/config';

// Singleton connection
let connection;
let db;

export async function getDb() {
    if (!db) {
        connection = await mysql.createConnection(process.env.DATABASE_URL);
        db = drizzle(connection, { schema, mode: 'default' });
    }
    return db;
}

export { schema };
