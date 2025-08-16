import { APP_ERROR } from "@/common/appError";
import { type ProductsModel, ProductsRepository } from "..";

/**
 * Retrieves a product by their slug.
 *
 * @param {string} slug The unique URL-friendly identifier for the product.
 * @returns {Promise<ProductsModel.Entity>} The product data.
 * @throws {AppError} Throws `NOT_FOUND` error if product with given slug doesn't exist.
 */
export const getProductBySlugUseCase = async (
	slug: string,
): Promise<ProductsModel.Entity> => {
	const product = await ProductsRepository.getBySlug(slug);

	if (!product) {
		throw APP_ERROR.NOT_FOUND();
	}

	return product;
};
