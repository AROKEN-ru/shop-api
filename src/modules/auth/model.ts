import { t } from "elysia";
import { UsersModel } from "@/modules/users";

export namespace AuthModel {
	export const login = t.Omit(UsersModel.create, ["name"]);
	export type Login = typeof login.static;

	export const register = UsersModel.create;
	export type Register = UsersModel.Create;

	export const loginResponse = t.Object({
		token: t.String({
			description: "JWT token",
		}),
	});
	export const registerResponse = loginResponse;
}
