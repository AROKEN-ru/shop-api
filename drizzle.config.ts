import { defineConfig } from "drizzle-kit";
import { config } from "@/config";

export default defineConfig({
	schema: "./src/db/schema",
	out: "./migrations",
	dialect: "sqlite",
	casing: "snake_case",
	dbCredentials: {
		url: config.DATABASE_URL,
	},
});
