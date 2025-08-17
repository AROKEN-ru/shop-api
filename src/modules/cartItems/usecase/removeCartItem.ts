import { APP_ERROR } from "@/common/appError";
import { type CartItemsModel, CartItemsRepository } from "..";

/**
 * Remove a product from user's cart.
 *
 * Removes a specific product from the user's cart.
 * Validates that the cart item exists before removing.
 *
 * @param {CartItemsModel.Remove} data The remove data (userId, productId).
 * @returns {Promise<void>} Returns void on successful deletion.
 * @throws {AppError} Throws `NOT_FOUND` if the cart item doesn't exist.
 */
export const removeCartItemUseCase = async (
	data: CartItemsModel.Remove,
): Promise<void> => {
	const existingItem = await CartItemsRepository.getItemByUserAndProduct(
		data.userId,
		data.productId,
	);

	if (!existingItem) {
		throw APP_ERROR.NOT_FOUND("Cart item not found.");
	}

	await CartItemsRepository.remove(data);
};
