import { APP_ERROR } from "@/common/appError";
import { type ProductsModel, ProductsRepository } from "..";

/**
 * Delete a product by its ID.
 *
 * Attempts to delete a product from the repository using the provided ID.
 *
 * @param {number} id The ID of the product to delete.
 * @returns {Promise<ProductsModel.Entity>} Returns the deleted product on successful deletion.
 * @throws {AppError} Throws `NOT_FOUND` error if product with given ID doesn't exist.
 */
export const deleteProductByIdUseCase = async (
	id: number,
): Promise<ProductsModel.Entity> => {
	const product = await ProductsRepository.getById(id);

	if (!product) {
		throw APP_ERROR.NOT_FOUND();
	}

	await ProductsRepository.deleteById(id);
	return product;
};
