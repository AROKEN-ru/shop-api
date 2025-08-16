import { AppError } from "@/common/errors";
import { STATUS } from "@/common/statusCodes";

export const APP_ERROR = {
	UNAUTHORIZED: (message = "Unauthorized.") =>
		new AppError(message, STATUS.UNAUTHORIZED),
	INVALID_CREDENTIALS: (message = "Invalid credentials.") =>
		new AppError(message, STATUS.UNAUTHORIZED),
	NOT_FOUND: (message = "Not found.") =>
		new AppError(message, STATUS.NOT_FOUND),
	ALREADY_EXISTS: (message = "Already exists.") =>
		new AppError(message, STATUS.CONFLICT),
} as const;
