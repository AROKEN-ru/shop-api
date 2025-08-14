import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { usersTable } from "@/users/schema";

export namespace UsersModel {
	const _insertSchema = createInsertSchema(usersTable, {
		email: t.String({ format: "email" }),
		name: t.String({ minLength: 1, maxLength: 32 }),
		password: t.String({ minLength: 6, maxLength: 32 }),
	});
	const _selectSchema = createSelectSchema(usersTable);

	export type Entity = typeof _selectSchema.static;

	export const get = t.Omit(_selectSchema, ["password"]);
	export type Get = typeof get.static;

	export const create = t.Omit(_insertSchema, ["id", "createdAt", "updatedAt"]);
	export type Create = typeof create.static;
}
