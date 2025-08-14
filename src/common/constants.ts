import { status } from "http-status";
import { AppError } from "./errors";

export const APP_ERROR = {
	UNAUTHORIZED: new AppError("Unauthorized", status.UNAUTHORIZED),
	INVALID_CREDENTIALS: new AppError(
		"Invalid credentials.",
		status.UNAUTHORIZED,
	),
} as const;
