import env from "env-var";

export const config = {
	PORT: env.get("PORT").default(8000).asPortNumber(),
	DATABASE_URL: env.get("DATABASE_URL").required().asString(),
	JWT_SECRET: env.get("JWT_SECRET").required().asString(),
	JWT_EXP: env.get("JWT_EXP").default("14d").asString(),
	REQUEST_DELAY: env.get("REQUEST_DELAY").default(500).asIntPositive(),
} as const;
