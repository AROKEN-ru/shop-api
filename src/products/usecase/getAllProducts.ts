import type { ProductsModel } from "@/products/model";
import { ProductsRepository } from "@/products/repository";

/**
 * Retrieves a paginated, sorted, and filtered list of products.
 *
 * @param {ProductsModel.GetAllParams} params Parameters for retrieving products.
 * @returns {Promise<ProductsModel.Paginated>} The paginated list of products.
 *
 * @remarks
 * The result includes `items`, `total`, `totalPages`, `page`, and `limit`.
 */
export const getAllProductsUseCase = async ({
	page = 1,
	limit = 10,
	search = "",
	sort,
}: ProductsModel.GetAllParams): Promise<ProductsModel.Paginated> => {
	return await ProductsRepository.getAll({
		page,
		limit,
		search,
		sort,
	});
};
