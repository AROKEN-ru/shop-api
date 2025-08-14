import Elysia from "elysia";
import { authGuard } from "@/auth/guard";
import { UsersModel } from "@/users/model";
import { getUserByIdUseCase } from "@/users/usecase";

export const usersController = new Elysia({
	prefix: "/users",
	detail: {
		tags: ["Users"],
		security: [
			{
				bearerAuth: [],
			},
		],
	},
})
	.use(authGuard)
	.get(
		"/me",
		async ({ userId }) => {
			return await getUserByIdUseCase(userId);
		},
		{
			response: UsersModel.get,
			detail: {
				description: "Get the current user",
			},
		},
	);
