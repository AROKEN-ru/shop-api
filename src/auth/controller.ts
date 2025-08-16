import Elysia from "elysia";
import { jwtSetup } from "@/auth/jwtSetup";
import { AuthModel } from "@/auth/model";
import { loginUseCase, registerUseCase } from "@/auth/usecase";
import { ERROR_RESPONSES } from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";

export const authController = new Elysia({
	prefix: "/auth",
	detail: { tags: ["Auth"] },
})
	.use(jwtSetup)
	.post(
		"/register",
		async ({ body, jwt, set }) => {
			const user = await registerUseCase(body);
			const token = await jwt.sign({
				id: user.id,
			});

			set.status = STATUS.CREATED;
			return {
				token,
			};
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
				description: "Register a new user and return jwt token.",
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
				description: "Login a user and return jwt token.",
			},
		},
	);
