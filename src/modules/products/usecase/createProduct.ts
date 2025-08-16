import { APP_ERROR } from "@/common/appError";
import { type ProductsModel, ProductsRepository } from "..";

/**
 * Create a new product.
 *
 * Checks if a product with the given slug already exists
 * and creates a new product in the repository.
 *
 * @param {ProductsModel.Create} productToCreate The data for the new product.
 * @returns {Promise<ProductsModel.Entity>} The newly created product entity.
 * @throws {AppError} Throws `ALREADY_EXISTS` if a product with the same slug already exists.
 */
export const createProductUseCase = async (
	productToCreate: ProductsModel.Create,
): Promise<ProductsModel.Entity> => {
	const existingProduct = await ProductsRepository.getBySlug(
		productToCreate.slug,
	);

	if (existingProduct) {
		throw APP_ERROR.ALREADY_EXISTS("Product with this slug already exists.");
	}

	return ProductsRepository.create(productToCreate);
};
