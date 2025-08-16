import { APP_ERROR } from "@/common/appError";
import type { ProductsModel } from "@/products/model";
import { ProductsRepository } from "@/products/repository";

/**
 * Update an existing product by ID.
 *
 * Checks if a product with the given ID exists
 * and updates it in the repository with the provided data.
 *
 * @param {number} id The ID of the product to update.
 * @param {ProductsModel.UpdateById} data The updated data for the product.
 * @returns {Promise<ProductsModel.Entity>} The updated product entity.
 * @throws {AppError} Throws `NOT_FOUND` if a product with the given ID doesn't exist.
 * @throws {AppError} Throws `ALREADY_EXISTS` if trying to update to a slug that is already used by another product.
 */
export const updateProductByIdUseCase = async (
	id: number,
	data: ProductsModel.UpdateById,
): Promise<ProductsModel.Entity> => {
	const product = await ProductsRepository.getById(id);

	if (!product) {
		throw APP_ERROR.NOT_FOUND();
	}

	if (data.slug) {
		const existingProduct = await ProductsRepository.getBySlug(data.slug);
		if (existingProduct && existingProduct.id !== id) {
			throw APP_ERROR.ALREADY_EXISTS("Product with this slug already exists.");
		}
	}

	return ProductsRepository.updateById(id, data);
};
