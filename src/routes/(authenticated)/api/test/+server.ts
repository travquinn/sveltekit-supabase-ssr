// src/routes/api/test/+server.ts
import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
