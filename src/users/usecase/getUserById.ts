import status from "http-status";
import { AppError } from "@/common/errors";
import type { UsersModel } from "@/users/model";
import { UsersRepository } from "@/users/repository";

/**
 * Retrieves a user by their ID.
 *
 * @param {number} id The ID of the user to retrieve.
 * @returns {Promise<UsersModel.Get>} The user data.
 * @throws {AppError} If the user with the given ID does not exist.
 */
export const getUserByIdUseCase = async (
	id: number,
): Promise<UsersModel.Get> => {
	const user = await UsersRepository.findById(id);

	if (!user) {
		throw new AppError(`User with ID ${id} not found`, status.NOT_FOUND);
	}

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
