import type { ProductsModel } from "@/products/model";
import { ProductsRepository } from "@/products/repository";

/**
 * Create multiple products.
 *
 * Creates multiple new products in the repository.
 *
 * @param {ProductsModel.Create[]} productsToCreate Array of product data to create
 * @returns {Promise<ProductsModel.Entity[]>} Array of newly created product entities
 */
export const createManyProductsUseCase = async (
	productsToCreate: ProductsModel.Create[],
): Promise<ProductsModel.Entity[]> => {
	return ProductsRepository.createMany(productsToCreate);
};
