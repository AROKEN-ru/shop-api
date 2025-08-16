import { APP_ERROR } from "@/common/appError";
import { type UsersModel, UsersRepository } from "@/modules/users";
import { type AuthModel, hashPassword } from "..";

/**
 * Registers a new user.
 *
 * Checks if a user with the given email already exists,
 * hashes the provided password, and creates a new user in the repository.
 *
 * @param {AuthModel.Register} userToCreate The data for the new user.
 * @returns {Promise<UsersModel.Entity>} The newly created user entity.
 * @throws {AppError} Throws `ALREADY_EXISTS` if a user with the same email already exists.
 */
export const registerUseCase = async (
	userToCreate: AuthModel.Register,
): Promise<UsersModel.Entity> => {
	const existingUser = await UsersRepository.getByEmail(userToCreate.email);
	if (existingUser) {
		throw APP_ERROR.ALREADY_EXISTS("User with this email already exists.");
	}

	const hashedPassword = await hashPassword(userToCreate.password);

	const newUser = await UsersRepository.create({
		email: userToCreate.email,
		name: userToCreate.name,
		password: hashedPassword,
	});

	return newUser;
};
