import { type TSchema, t } from "elysia";

export const pagination = <T extends TSchema>(item: T) =>
	t.Object({
		items: t.Array(item),
		page: t.Number({ minimum: 1, default: 1 }),
		totalPages: t.Number({ minimum: 1, default: 1 }),
		limit: t.Number(),
		totalItems: t.Number(),
	});
