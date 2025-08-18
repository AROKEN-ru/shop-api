import { logger } from "@tqman/nice-logger";
import Elysia from "elysia";
import { api } from "@/api";
import {
	corsPlugin,
	errorHandlerPlugin,
	responseDelayPlugin,
	swaggerPlugin,
} from "@/plugins";

export const app = new Elysia()
	.use(corsPlugin)
	.use(swaggerPlugin)
	.use(errorHandlerPlugin)
	.use(responseDelayPlugin) // only for dev
	.use(logger())
	.use(api);
