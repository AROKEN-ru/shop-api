import cors from "@elysiajs/cors";
import type Elysia from "elysia";

export const corsPlugin = (app: Elysia) =>
	app.use(
		cors({
			origin: true,
			credentials: true,
		}),
	);
