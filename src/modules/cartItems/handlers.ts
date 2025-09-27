import Elysia, { t } from "elysia";
import {
	ERROR_RESPONSES,
	withAuthErrorDescription,
	withAuthErrors,
} from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";
import { authGuard } from "@/modules/auth/guard";
import { CartItemsModel } from "./model";
import {
	addToCartUseCase,
	clearCartUseCase,
	getCartCountUseCase,
	getCartUseCase,
	removeCartItemUseCase,
	updateCartItemQuantityUseCase,
} from "./usecase";

export const cartHandlers = new Elysia({
	prefix: "/cart",
	detail: {
		tags: ["Cart"],
		security: [
			{
				bearerAuth: [],
			},
		],
	},
})
	.model({
		cartSummary: CartItemsModel.summary,
		cartItem: CartItemsModel.entity,
		addToCart: CartItemsModel.addBody,
		updateCart: CartItemsModel.updateBody,
		removeFromCart: CartItemsModel.removeBody,
	})
	.use(authGuard)
	.get(
		"",
		({ query, userId }) => {
			return getCartUseCase(userId, query);
		},
		{
			query: CartItemsModel.getParams,
			response: withAuthErrors({
				[STATUS.OK]: CartItemsModel.summary,
				[STATUS.UNPROCESSABLE_ENTITY]:
					ERROR_RESPONSES[STATUS.UNPROCESSABLE_ENTITY],
			}),
			detail: {
				description: "Get user's cart with products and pagination.",
				responses: withAuthErrorDescription({
					[STATUS.OK]: {
						description: "Cart items retrieved successfully.",
					},
					[STATUS.UNPROCESSABLE_ENTITY]: {
						description: "Invalid pagination parameters.",
					},
				}),
			},
		},
	)
	.post(
		"",
		async ({ body, userId, status }) => {
			const cartItem = await addToCartUseCase({ ...body, userId });
			return status(STATUS.CREATED, cartItem);
		},
		{
			body: CartItemsModel.addBody,
			response: withAuthErrors({
				[STATUS.CREATED]: CartItemsModel.withProduct,
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
				[STATUS.UNPROCESSABLE_ENTITY]:
					ERROR_RESPONSES[STATUS.UNPROCESSABLE_ENTITY],
			}),
			detail: {
				description: "Add a product to cart or increase quantity.",
				responses: withAuthErrorDescription({
					[STATUS.CREATED]: {
						description: "Cart item created successfully.",
					},
					[STATUS.NOT_FOUND]: {
						description: "Product not found.",
					},
					[STATUS.UNPROCESSABLE_ENTITY]: {
						description: "Invalid quantity.",
					},
				}),
			},
		},
	)
	.patch(
		"",
		async ({ body, userId, status }) => {
			const cartItem = await updateCartItemQuantityUseCase({ ...body, userId });

			if (cartItem === null) {
				return status(STATUS.NO_CONTENT, void 0);
			}

			return status(STATUS.OK, cartItem);
		},
		{
			body: CartItemsModel.updateBody,
			response: withAuthErrors({
				[STATUS.OK]: CartItemsModel.withProduct,
				[STATUS.NO_CONTENT]: t.Void(),
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
				[STATUS.UNPROCESSABLE_ENTITY]:
					ERROR_RESPONSES[STATUS.UNPROCESSABLE_ENTITY],
			}),
			detail: {
				description:
					"Update quantity of a product in cart. Set to 0 to remove.",
				responses: withAuthErrorDescription({
					[STATUS.OK]: {
						description: "Cart item updated successfully.",
					},
					[STATUS.NO_CONTENT]: {
						description: "Cart item removed successfully.",
					},
					[STATUS.NOT_FOUND]: {
						description: "Cart item not found.",
					},
					[STATUS.UNPROCESSABLE_ENTITY]: {
						description: "Invalid quantity.",
					},
				}),
			},
		},
	)
	.delete(
		"/item",
		async ({ body, userId, status }) => {
			await removeCartItemUseCase({ ...body, userId });
			return status(STATUS.NO_CONTENT, void 0);
		},
		{
			body: CartItemsModel.removeBody,
			response: withAuthErrors({
				[STATUS.NO_CONTENT]: t.Void(),
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
			}),
			detail: {
				description: "Remove a specific product from cart.",
				responses: withAuthErrorDescription({
					[STATUS.NO_CONTENT]: {
						description: "Cart item removed successfully.",
					},
					[STATUS.NOT_FOUND]: {
						description: "Cart item not found.",
					},
				}),
			},
		},
	)
	.delete(
		"",
		async ({ userId, status }) => {
			await clearCartUseCase({ userId });
			return status(STATUS.NO_CONTENT, void 0);
		},
		{
			response: withAuthErrors({
				[STATUS.NO_CONTENT]: t.Void(),
			}),
			detail: {
				description: "Clear all items from cart.",
				responses: withAuthErrorDescription({
					[STATUS.NO_CONTENT]: {
						description: "Cart cleared successfully.",
					},
				}),
			},
		},
	)
		.get(
		"/count",
		async ({ userId }) => {
			const count = await getCartCountUseCase(userId);
			return { count };
		},
		{
			response: withAuthErrors({
				[STATUS.OK]: t.Object({
					count: t.Number({ description: "Total number of items in cart" }),
				}),
			}),
			detail: {
				description: "Get total number of items in user's cart.",
				responses: withAuthErrorDescription({
					[STATUS.OK]: {
						description: "Cart item count retrieved successfully.",
					},
				}),
			},
		},
	);
