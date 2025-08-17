import { type CartItemsModel, CartItemsRepository } from "..";

/**
 * Clear all items from user's cart.
 *
 * Removes all items from the user's cart.
 * No validation required as clearing an empty cart is not an error.
 *
 * @param {CartItemsModel.Clear} data The clear data (userId).
 * @returns {Promise<void>} Returns void on successful deletion.
 */
export const clearCartUseCase = async (
	data: CartItemsModel.Clear,
): Promise<void> => {
	return CartItemsRepository.clear(data);
};
