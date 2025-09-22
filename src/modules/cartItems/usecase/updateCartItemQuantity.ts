import { APP_ERROR } from "@/common/appError";
import { type CartItemsModel, CartItemsRepository } from "..";

/**
 * Update the quantity of a product in user's cart.
 *
 * Updates the quantity of a specific product in the user's cart.
 * If quantity is set to 0, removes the item from cart.
 * Validates that the cart item exists before updating.
 *
 * @param {CartItemsModel.Update} data The update data (userId, productId, quantity).
 * @returns {Promise<CartItemsModel.WithProduct | null>} The updated cart item, or null if item was removed.
 * @throws {AppError} Throws `NOT_FOUND` if the cart item doesn't exist.
 */
export const updateCartItemQuantityUseCase = async (
	data: CartItemsModel.Update,
): Promise<CartItemsModel.WithProduct | null> => {
	const existingItem = await CartItemsRepository.getItemByUserAndProduct(
		data.userId,
		data.productId,
	);

	if (!existingItem) {
		throw APP_ERROR.NOT_FOUND("Cart item not found.");
	}

	return CartItemsRepository.updateQuantity(data);
};
