import env from "env-var";

export const config = {
	PORT: env.get("PORT").default(8000).asPortNumber(),
	DATABASE_URL: env.get("DATABASE_URL").required().asString(),
	JWT_SECRET: env.get("JWT_SECRET").required().asString(),
} as const;
