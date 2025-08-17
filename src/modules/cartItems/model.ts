import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { cartItemsTable } from "@/db/schema";
import { ProductsModel } from "@/modules/products";
import { pagination } from "@/types/pagination";

export namespace CartItemsModel {
	const _insertSchema = createInsertSchema(cartItemsTable, {
		userId: t.Number({ minimum: 1 }),
		productId: t.Number({ minimum: 1 }),
		quantity: t.Number({ minimum: 1, maximum: 999 }),
	});

	const _selectSchema = createSelectSchema(cartItemsTable, {
		id: t.Number({ minimum: 1 }),
		userId: t.Number({ minimum: 1 }),
		productId: t.Number({ minimum: 1 }),
		quantity: t.Number({ minimum: 1 }),
	});

	export const entity = _selectSchema;
	export type Entity = typeof entity.static;

	export const getParams = t.Object({
		page: t.Optional(t.Number({ minimum: 1 })),
		limit: t.Optional(t.Number({ minimum: 1, maximum: 50 })),
	});
	export type GetParams = typeof getParams.static;

	export const addBody = t.Object({
		productId: t.Number({ minimum: 1 }),
		quantity: t.Optional(t.Number({ minimum: 1, maximum: 999, default: 1 })),
	});

	export const updateBody = t.Object({
		productId: t.Number({ minimum: 1 }),
		quantity: t.Number({ minimum: 0, maximum: 999 }),
	});

	export const removeBody = t.Object({
		productId: t.Number({ minimum: 1 }),
	});

	export const add = t.Object({
		userId: t.Number({ minimum: 1 }),
		...addBody.properties,
	});
	export type Add = typeof add.static;

	export const update = t.Object({
		userId: t.Number({ minimum: 1 }),
		...updateBody.properties,
	});
	export type Update = typeof update.static;

	export const remove = t.Object({
		userId: t.Number({ minimum: 1 }),
		...removeBody.properties,
	});
	export type Remove = typeof remove.static;

	export const clear = t.Object({
		userId: t.Number({ minimum: 1 }),
	});
	export type Clear = typeof clear.static;

	export const withProduct = t.Object({
		id: t.Number({ minimum: 1 }),
		userId: t.Number({ minimum: 1 }),
		productId: t.Number({ minimum: 1 }),
		quantity: t.Number({ minimum: 1 }),
		createdAt: t.String(),
		updatedAt: t.String(),
		product: t.Omit(ProductsModel.entity, ["createdAt", "updatedAt"]),
	});
	export type WithProduct = typeof withProduct.static;

	export const summary = t.Object({
		items: t.Array(withProduct),
		totalItems: t.Number({ minimum: 0 }),
		totalPrice: t.Number({ minimum: 0 }),
		page: t.Number({ minimum: 1 }),
		limit: t.Number({ minimum: 1 }),
		totalPages: t.Number({ minimum: 1 }),
	});
	export type Summary = typeof summary.static;

	export const paginated = pagination(_selectSchema);
	export type Paginated = typeof paginated.static;

	export const create = t.Omit(_insertSchema, ["id", "createdAt", "updatedAt"]);
	export type Create = typeof create.static;
}
