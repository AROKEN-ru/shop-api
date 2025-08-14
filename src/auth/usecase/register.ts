import status from "http-status";
import { hashPassword } from "@/auth/hash";
import type { AuthModel } from "@/auth/model";
import { AppError } from "@/common/errors";
import type { UsersModel } from "@/users/model";
import { UsersRepository } from "@/users/repository";

/**
 * Registers a new user.
 *
 * Checks if a user with the given email already exists,
 * hashes the provided password, and creates a new user in the repository.
 *
 * @param {AuthModel.Register} userToCreate The data for the new user.
 * @returns {Promise<UsersModel.Entity>} The newly created user entity.
 * @throws {AppError} Throws an error if a user with the same email already exists.
 */
export const registerUseCase = async (
	userToCreate: AuthModel.Register,
): Promise<UsersModel.Entity> => {
	const existingUser = await UsersRepository.findByEmail(userToCreate.email);
	if (existingUser) {
		throw new AppError("User already exists", status.CONFLICT);
	}

	const hashedPassword = await hashPassword(userToCreate.password);

	const newUser = await UsersRepository.create({
		email: userToCreate.email,
		name: userToCreate.name,
		password: hashedPassword,
	});

	return newUser;
};
