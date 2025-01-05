// $lib/server/db/schema.ts
import { sql } from 'drizzle-orm';
import { pgSchema, pgTable, uuid, text, timestamp, varchar, boolean, pgPolicy } from 'drizzle-orm/pg-core';
import { authenticatedRole, authUsers } from 'drizzle-orm/supabase';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Define tables with RLS policies
export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}, (table) => [
  pgPolicy('tenant_isolation', {
    for: 'all',
    to: authenticatedRole,
    using: sql`auth.uid() IN (
      SELECT user_id 
      FROM user_tenants 
      WHERE tenant_id = id
    )`
  })
]);

export const user_tenants = pgTable('user_tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => authUsers.id),
  tenant_id: uuid('tenant_id').notNull().references(() => tenants.id),
  role: varchar('role', { length: 50 }).default('member'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}, (table) => [
  pgPolicy('user_tenant_isolation', {
    for: 'all',
    to: authenticatedRole,
    using: sql`auth.uid() = user_id`
  })
]);

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenant_id: uuid('tenant_id').notNull().references(() => tenants.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
}, (table) => [
  pgPolicy('project_isolation', {
    for: 'all',
    to: authenticatedRole,
    using: sql`auth.uid() IN (
      SELECT user_id 
      FROM user_tenants 
      WHERE tenant_id = projects.tenant_id
    )`
  })
]);

// Zod schemas for validation
export const tenantSchema = createSelectSchema(tenants);
export const insertTenantSchema = createInsertSchema(tenants);

export const userTenantSchema = createSelectSchema(user_tenants);
export const insertUserTenantSchema = createInsertSchema(user_tenants);

export const projectSchema = createSelectSchema(projects);
export const insertProjectSchema = createInsertSchema(projects);
