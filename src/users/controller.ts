import Elysia from "elysia";
import { authGuard } from "@/auth/guard";
import { ERROR_RESPONSES, withAuthErrors } from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";
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
		({ userId }) => {
			return getUserByIdUseCase(userId);
		},
		{
			response: withAuthErrors({
				[STATUS.OK]: UsersModel.get,
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
			}),
			detail: {
				description: "Get the current user.",
			},
		},
	);
