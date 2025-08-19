import type Elysia from "elysia";
import { config } from "@/config";

export const responseDelayPlugin = (app: Elysia) =>
	app.onBeforeHandle(async () => {
		await Bun.sleep(Math.floor(Math.random() * config.REQUEST_DELAY));
	});
