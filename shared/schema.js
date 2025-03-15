import { pgTable, text, serial, timestamp, json } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
// import { z } from 'zod'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    accessToken: text('access_token').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const gists = pgTable('gists', {
    id: text('id').primaryKey(),
    description: text('description'),
    files: json('files').notNull(),
    owner: text('owner').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
})

export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    accessToken: true,
})
