import { type CartItemsModel, CartItemsRepository } from "..";

/**
 * Get user's cart with products and pagination.
 *
 * Retrieves the cart items for a specific user with product details,
 * pagination support, and cart summary (total items, total price).
 *
 * @param {number} userId The ID of the user whose cart to retrieve.
 * @param {CartItemsModel.GetParams} params Pagination parameters (page, limit).
 * @returns {Promise<CartItemsModel.Summary>} The cart summary with items, pagination, and totals.
 */
export const getCartUseCase = async (
	userId: number,
	params: CartItemsModel.GetParams = {},
): Promise<CartItemsModel.Summary> => {
	return CartItemsRepository.getByUserId({ userId, ...params });
};
