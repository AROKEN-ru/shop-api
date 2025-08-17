import { APP_ERROR } from "@/common/appError";
import { type ProductsModel, ProductsRepository } from "..";

/**
 * Retrieves a product by their ID.
 *
 * @param {number} id The ID of the product to retrieve.
 * @returns {Promise<ProductsModel.Entity>} The product data.
 * @throws {AppError} Throws `NOT_FOUND` error if product with given ID doesn't exist.
 */
export const getProductByIdUseCase = async (
	id: number,
): Promise<ProductsModel.Entity> => {
	const product = await ProductsRepository.getById(id);

	if (!product) {
		throw APP_ERROR.NOT_FOUND("Product not found.");
	}

	return product;
};
