import bearer from "@elysiajs/bearer";
import type Elysia from "elysia";
import { APP_ERROR } from "@/common/appError";
import { jwtSetup } from "./jwtSetup";

export const authGuard = (app: Elysia) =>
	app
		.use(bearer())
		.use(jwtSetup)
		.derive({ as: "global" }, async ({ bearer, jwt }) => {
			if (!bearer) {
				throw APP_ERROR.UNAUTHORIZED();
			}

			const payload = await jwt.verify(bearer);
			if (!payload) {
				throw APP_ERROR.UNAUTHORIZED();
			}

			const userId = Number(payload.id);
			if (Number.isNaN(userId)) {
				throw APP_ERROR.UNAUTHORIZED();
			}

			return {
				userId,
			};
		});
