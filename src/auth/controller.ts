import { Elysia } from "elysia";
import status from "http-status";
import { jwtSetup } from "@/auth/jwtSetup";
import { AuthModel } from "@/auth/model";
import { loginUseCase, registerUseCase } from "@/auth/usecase";

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

			set.status = status.CREATED;
			return {
				token,
			};
		},
		{
			body: AuthModel.register,
			response: AuthModel.registerResponse,
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
			response: AuthModel.loginResponse,
			detail: {
				description: "Login a user and return jwt token.",
			},
		},
	);
