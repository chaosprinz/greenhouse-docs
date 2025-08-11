import { relations } from 'drizzle-orm';
import { timestamp, int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const grows = mysqlTable('grows', {
    id: int().autoincrement().notNull().primaryKey(),
    genetic: varchar({ length: 255 }).notNull(),    
});

export const growsRelations = relations(grows, ({ many }) => ({
    measurings: many(measurings),
}));

export const measurings = mysqlTable('measurerings', {
    id: int().autoincrement().notNull().primaryKey(),
    temperature: int().notNull(),
    humidity: int().notNull(),
    image: varchar({ length: 255 }),
    created_at: timestamp().defaultNow(),
    growId: int('grow_id')
        .references(() => grows.id, { onDelete: 'cascade'})
        .notNull(),
});

export const measuringRelations = relations(measurings, ({ one }) => ({
    grow: one(grows, {
        fields: [measurings.growId],
        references: [grows.id]
    }),
}));
