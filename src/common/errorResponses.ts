import { t } from "elysia";
import { STATUS } from "@/common/statusCodes";

export const errorSchema = t.Object({
	error: t.String(),
});

export const validationErrorSchema = t.Object({
	error: t.String(),
	details: t.Array(
		t.Object({
			path: t.String(),
			message: t.String(),
			schema: t.Any(),
		}),
	),
});

export const ERROR_RESPONSES = {
	[STATUS.BAD_REQUEST]: errorSchema,
	[STATUS.UNAUTHORIZED]: errorSchema,
	[STATUS.NOT_FOUND]: errorSchema,
	[STATUS.CONFLICT]: errorSchema,
	[STATUS.UNPROCESSABLE_ENTITY]: validationErrorSchema,
	[STATUS.INTERNAL_SERVER_ERROR]: errorSchema,
} as const;

export const withAuthErrors = <T extends Record<number, any>>(
	responseSchemas: T,
): T & { 401: (typeof ERROR_RESPONSES)[401] } => {
	return {
		...responseSchemas,
		401: ERROR_RESPONSES[STATUS.UNAUTHORIZED],
	};
};
