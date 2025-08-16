import { STATUS, type StatusCode } from "@/common/statusCodes";

export class AppError extends Error {
	public readonly statusCode: StatusCode;

	constructor(message: string, statusCode: StatusCode = STATUS.BAD_REQUEST) {
		super(message);
		this.name = "AppError";
		this.statusCode = statusCode;
	}
}
