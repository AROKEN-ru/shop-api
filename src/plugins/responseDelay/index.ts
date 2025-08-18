import type Elysia from "elysia";

export const responseDelayPlugin = (app: Elysia) =>
	app.onBeforeHandle(async () => {
		await Bun.sleep(Math.floor(Math.random() * 500));
	});
