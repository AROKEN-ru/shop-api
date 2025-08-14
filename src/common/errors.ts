import { status } from "http-status";

export class AppError extends Error {
	public readonly statusCode: number;

	constructor(message: string, statusCode: number = status.BAD_REQUEST) {
		super(message);
		this.name = "AppError";
		this.statusCode = statusCode;
	}
}
