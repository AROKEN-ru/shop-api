import Elysia from "elysia";
import { authController } from "@/modules/auth";
import { productsController } from "@/modules/products";
import { usersController } from "@/modules/users";

export const api = new Elysia({ name: "api" }).group("/api", (app) =>
	app.use(authController).use(usersController).use(productsController),
);
