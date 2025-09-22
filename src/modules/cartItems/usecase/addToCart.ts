import { APP_ERROR } from "@/common/appError";
import { ProductsRepository } from "@/modules/products";
import { type CartItemsModel, CartItemsRepository } from "..";

/**
 * Add a product to user's cart.
 *
 * Validates that the product exists and adds it to the user's cart.
 * If the product is already in the cart, increases the quantity.
 *
 * @param {CartItemsModel.Add} data The cart item data (userId, productId, quantity).
 * @returns {Promise<CartItemsModel.WithProduct>} The created or updated cart item.
 * @throws {AppError} Throws `NOT_FOUND` if the product doesn't exist.
 */
export const addToCartUseCase = async (
	data: CartItemsModel.Add,
): Promise<CartItemsModel.WithProduct> => {
	const product = await ProductsRepository.getById(data.productId);

	if (!product) {
		throw APP_ERROR.NOT_FOUND("Product not found.");
	}

	return CartItemsRepository.addOrUpdate(data);
};
