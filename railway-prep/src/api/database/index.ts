import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';

export const db = (d1: D1Database): DrizzleD1Database => drizzle(d1);
