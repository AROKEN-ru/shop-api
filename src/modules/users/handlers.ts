import Elysia from "elysia";
import {
	ERROR_RESPONSES,
	withAuthErrorDescription,
	withAuthErrors,
} from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";
import { authGuard } from "@/modules/auth/guard";
import { UsersModel } from "./model";
import { getUserByIdUseCase } from "./usecase";

export const usersHandlers = new Elysia({
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
	.model({
		user: UsersModel.entity,
		getUser: UsersModel.get,
		createUser: UsersModel.create,
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
				responses: withAuthErrorDescription({
					[STATUS.OK]: {
						description: "User retrieved successfully.",
					},
					[STATUS.NOT_FOUND]: {
						description: "User not found.",
					},
				}),
			},
		},
	);
