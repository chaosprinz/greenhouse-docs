import { InferSelectModel, relations } from "drizzle-orm";
import { timestamp, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const grows = mysqlTable("grows", {
  id: int().autoincrement().notNull().primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  startedAt: timestamp("started_at"),
  floweringInitAt: timestamp("flowering_init_at"),
  floweringStartedAt: timestamp("flowering_started_at"),
  geneticId: int("genetic_id").references(() => genetics.id, {
    onDelete: "set null",
  }),
});

export const growsRelations = relations(grows, ({ many, one }) => ({
  measurings: many(measurings),
  genetic: one(genetics, {
    fields: [grows.geneticId],
    references: [genetics.id],
  }),
}));

export const measurings = mysqlTable("measurings", {
  id: int().autoincrement().notNull().primaryKey(),
  temperature: int().notNull(),
  humidity: int().notNull(),
  createdAt: timestamp("created_at").defaultNow().onUpdateNow().notNull(),
  growId: int("grow_id")
    .references(() => grows.id, { onDelete: "cascade" })
    .notNull(),
});

export type Measuring = InferSelectModel<typeof measurings>;

export const measuringRelations = relations(measurings, ({ one }) => ({
  grow: one(grows, {
    fields: [measurings.growId],
    references: [grows.id],
  }),
}));

export const genetics = mysqlTable("genetics", {
  id: int().autoincrement().notNull().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  breeder: varchar({ length: 255 }).notNull(),
  genus: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  productPage: varchar("product_page", { length: 255 }),
});

export type Genetic = InferSelectModel<typeof genetics>;

export const geneticRelations = relations(genetics, ({ many }) => ({
  grows: many(grows),
}));
