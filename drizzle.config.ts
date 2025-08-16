import { defineConfig } from "drizzle-kit";
import { config } from "@/config";

export default defineConfig({
	schema: "./src/modules/**/schema.ts",
	out: "./migrations",
	dialect: "sqlite",
	casing: "snake_case",
	dbCredentials: {
		url: config.DATABASE_URL,
	},
});
