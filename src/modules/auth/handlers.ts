import Elysia from "elysia";
import { ERROR_RESPONSES } from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";
import { jwtSetup } from "./jwtSetup";
import { AuthModel } from "./model";
import { loginUseCase, registerUseCase } from "./usecase";

export const authHandlers = new Elysia({
	prefix: "/auth",
	detail: { tags: ["Auth"] },
})
	.use(jwtSetup)
	.post(
		"/register",
		async ({ body, jwt, status }) => {
			const user = await registerUseCase(body);
			const token = await jwt.sign({
				id: user.id,
			});

			return status(STATUS.CREATED, {
				token,
				user,
			});
		},
		{
			body: AuthModel.register,
			response: {
				[STATUS.CREATED]: AuthModel.registerResponse,
				[STATUS.CONFLICT]: ERROR_RESPONSES[STATUS.CONFLICT],
				[STATUS.UNPROCESSABLE_ENTITY]:
					ERROR_RESPONSES[STATUS.UNPROCESSABLE_ENTITY],
			},
			detail: {
				description: "Register a new user and return jwt token and user data.",
				responses: {
					[STATUS.CREATED]: {
						description: "User registered successfully.",
					},
					[STATUS.CONFLICT]: {
						description: "User with this email already exists.",
					},
					[STATUS.UNPROCESSABLE_ENTITY]: {
						description: "Invalid register data.",
					},
				},
			},
		},
	)
	.post(
		"/login",
		async ({ body, jwt }) => {
			const user = await loginUseCase(body);
			const token = await jwt.sign({
				id: user.id,
			});

			return {
				token,
				user,
			};
		},
		{
			body: AuthModel.login,
			response: {
				[STATUS.OK]: AuthModel.loginResponse,
				[STATUS.UNAUTHORIZED]: ERROR_RESPONSES[STATUS.UNAUTHORIZED],
				[STATUS.UNPROCESSABLE_ENTITY]:
					ERROR_RESPONSES[STATUS.UNPROCESSABLE_ENTITY],
			},
			detail: {
				description: "Login a user and return jwt token and user data.",
				responses: {
					[STATUS.OK]: {
						description: "User logged in successfully.",
					},
					[STATUS.UNAUTHORIZED]: {
						description: "Invalid credentials.",
					},
					[STATUS.UNPROCESSABLE_ENTITY]: {
						description: "Invalid login data.",
					},
				},
			},
		},
	);
