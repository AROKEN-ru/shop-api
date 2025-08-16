import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { pagination } from "@/types/pagination";
import { productsTable } from "./schema";

export namespace ProductsModel {
	const _insertSchema = createInsertSchema(productsTable, {
		name: t.String({ minLength: 1, maxLength: 48 }),
		slug: t.String({
			minLength: 1,
			maxLength: 48,
			description: "Product unique slug",
		}),
		description: t.String({ minLength: 1 }),
		img: t.String({ minLength: 1 }),
		price: t.Number({ minimum: 1 }),
	});
	const _selectSchema = createSelectSchema(productsTable, {
		id: t.Number({ minimum: 1 }),
		price: t.Number({ minimum: 1 }),
	});

	export const entity = _selectSchema;
	export type Entity = typeof entity.static;

	export const getAllParams = t.Object({
		page: t.Optional(t.Number()),
		limit: t.Optional(t.Number()),
		search: t.Optional(t.String()),
		sort: t.Optional(
			t.String({
				enum: ["asc", "desc"],
				description: "Sort order",
			}),
		),
	});
	export type GetAllParams = typeof getAllParams.static;

	export const bySlugParams = t.Object({
		slug: t.String({ description: "Product unique slug" }),
	});
	export const byIdParams = t.Object({
		id: t.Number({ minimum: 1 }),
	});

	export const paginated = pagination(_selectSchema);
	export type Paginated = typeof paginated.static;

	export const create = t.Omit(_insertSchema, ["id", "createdAt", "updatedAt"]);
	export type Create = typeof create.static;

	export const updateById = t.Partial(create);
	export type UpdateById = typeof updateById.static;
}
