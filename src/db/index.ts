import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { config } from "@/config";
import { usersTable } from "@/users/schema";

export const sqlite = createClient({
	url: config.DATABASE_URL,
});

export const db = drizzle(sqlite, {
	casing: "snake_case",
	schema: {
		users: usersTable,
	},
});
