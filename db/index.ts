import 'dotenv/config'
import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
});

const db = drizzle({client: connection, schema, mode: 'default'});

export default db;
