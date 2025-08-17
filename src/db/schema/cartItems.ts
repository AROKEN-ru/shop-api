import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { productsTable, usersTable } from ".";

export const cartItemsTable = sqliteTable(
	"cart_items",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		userId: integer("user_id")
			.notNull()
			.references(() => usersTable.id, {
				onDelete: "cascade",
			}),
		productId: integer("product_id")
			.notNull()
			.references(() => productsTable.id, {
				onDelete: "cascade",
			}),
		quantity: integer("quantity").notNull().default(1),
		createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
		updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
	},
	(table) => [unique().on(table.userId, table.productId)],
);
