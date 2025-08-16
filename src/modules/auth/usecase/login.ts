import { APP_ERROR } from "@/common/appError";
import { type UsersModel, UsersRepository } from "@/modules/users";
import { type AuthModel, verifyPassword } from "..";

/**
 * Login a user by verifying their credentials.
 *
 * Checks if the user exists by email, verifies the password,
 * and returns the user entity if authentication succeeds.
 *
 * @param {AuthModel.Login} userData The user credentials for login.
 * @returns {Promise<UsersModel.Get>} The authenticated user.
 * @throws {AppError} Throws `INVALID_CREDENTIALS` if the credentials are invalid.
 */
export const loginUseCase = async (
	userData: AuthModel.Login,
): Promise<UsersModel.Get> => {
	const user = await UsersRepository.getByEmail(userData.email);
	if (!user) {
		throw APP_ERROR.INVALID_CREDENTIALS();
	}

	const isPasswordValid = await verifyPassword(
		userData.password,
		user.password,
	);
	if (!isPasswordValid) {
		throw APP_ERROR.INVALID_CREDENTIALS();
	}

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
