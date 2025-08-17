import Elysia from "elysia";
import { authHandlers } from "@/modules/auth";
import { cartHandlers } from "@/modules/cartItems";
import { productsHandlers } from "@/modules/products";
import { usersHandlers } from "@/modules/users";

export const api = new Elysia({ name: "api" }).group("/api", (app) =>
	app
		.use(authHandlers)
		.use(usersHandlers)
		.use(productsHandlers)
		.use(cartHandlers),
);
