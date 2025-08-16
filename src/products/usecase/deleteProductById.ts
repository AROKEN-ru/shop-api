import { APP_ERROR } from "@/common/appError";
import { ProductsRepository } from "@/products/repository";

/**
 * Delete a product by its ID.
 *
 * Attempts to delete a product from the repository using the provided ID.
 *
 * @param {number} id The ID of the product to delete.
 * @returns {Promise<void>} Returns nothing on successful deletion.
 * @throws {AppError} Throws `NOT_FOUND` error if product with given ID doesn't exist.
 */
export const deleteProductByIdUseCase = async (id: number): Promise<void> => {
	const isDeleted = await ProductsRepository.deleteById(id);

	if (!isDeleted) {
		throw APP_ERROR.NOT_FOUND();
	}
};
