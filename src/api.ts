import Elysia from "elysia";
import { authController } from "@/auth/controller";
import { usersController } from "@/users/controller";
import { productsController } from "./products/controller";

export const api = new Elysia({ name: "api" }).group("/api", (app) =>
	app.use(authController).use(usersController).use(productsController),
);
