import { APP_ERROR } from "@/common/appError";
import type { UsersModel } from "@/users/model";
import { UsersRepository } from "@/users/repository";

/**
 * Retrieves a user by their ID.
 *
 * @param {number} id The ID of the user to retrieve.
 * @returns {Promise<UsersModel.Get>} The user data.
 * @throws {AppError} Throws `NOT_FOUND` if the user with the given ID does not exist.
 */
export const getUserByIdUseCase = async (
	id: number,
): Promise<UsersModel.Get> => {
	const user = await UsersRepository.getById(id);

	if (!user) {
		throw APP_ERROR.NOT_FOUND();
	}

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
