import { CartItemsRepository } from "..";

/**
 * Get total number of items in user's cart.
 *
 * Retrieves the total quantity of all products in a user's cart.
 *
 * @param {number} userId The ID of the user whose cart item count to retrieve.
 * @returns {Promise<number>} The total quantity of items in the cart.
 */
export const getCartCountUseCase = async (userId: number): Promise<number> => {
	return CartItemsRepository.getCountByUserId(userId);
};
