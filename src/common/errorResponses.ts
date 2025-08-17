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
	[STATUS.FORBIDDEN]: errorSchema,
	[STATUS.NOT_FOUND]: errorSchema,
	[STATUS.CONFLICT]: errorSchema,
	[STATUS.UNPROCESSABLE_ENTITY]: validationErrorSchema,
	[STATUS.INTERNAL_SERVER_ERROR]: errorSchema,
} as const;

export const withAuthErrors = <T extends Record<number, any>>(
	responseSchemas: T,
): T & {
	[STATUS.UNAUTHORIZED]: (typeof ERROR_RESPONSES)[typeof STATUS.UNAUTHORIZED];
} => {
	return {
		...responseSchemas,
		[STATUS.UNAUTHORIZED]: ERROR_RESPONSES[STATUS.UNAUTHORIZED],
	};
};

type ResponseDescription = {
	description: string;
};

type ResponseDescriptions = Record<number, ResponseDescription>;

export const withAuthErrorDescription = <T extends ResponseDescriptions>(
	responseDescriptions: T,
): T & {
	[STATUS.UNAUTHORIZED]: ResponseDescription;
} => {
	return {
		...responseDescriptions,
		[STATUS.UNAUTHORIZED]: {
			description: "Invalid or missing authentication token.",
		},
	};
};
