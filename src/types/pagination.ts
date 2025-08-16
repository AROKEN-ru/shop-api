import { type TSchema, t } from "elysia";

export const pagination = <T extends TSchema>(item: T) =>
	t.Object({
		items: t.Array(item),
		page: t.Number(),
		total: t.Number(),
		limit: t.Number(),
		totalPages: t.Number(),
	});
