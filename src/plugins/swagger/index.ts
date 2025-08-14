import swagger from "@elysiajs/swagger";
import type Elysia from "elysia";
import packageJson from "package.json";

export const swaggerPlugin = (app: Elysia) =>
	app.use(
		swagger({
			path: "/swagger",
			documentation: {
				info: {
					title: "Shop API",
					description: "Aroken.ru",
					version: packageJson.version,
				},
				components: {
					securitySchemes: {
						bearerAuth: {
							type: "http",
							scheme: "bearer",
							bearerFormat: "JWT",
						},
					},
				},
			},
		}),
	);
