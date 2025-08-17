import Elysia, { t } from "elysia";
import {
	ERROR_RESPONSES,
	withAuthErrorDescription,
	withAuthErrors,
} from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";
import { authGuard } from "@/modules/auth/guard";
import { ProductsModel } from "./model";
import {
	createProductUseCase,
	deleteProductByIdUseCase,
	getAllProductsUseCase,
	getProductBySlugUseCase,
	updateProductByIdUseCase,
} from "./usecase";

export const productsHandlers = new Elysia({
	prefix: "/products",
	detail: {
		tags: ["Products"],
		security: [
			{
				bearerAuth: [],
			},
		],
	},
})
	.model({
		product: ProductsModel.entity,
		products: ProductsModel.paginated,
		createProduct: ProductsModel.create,
		updateProduct: ProductsModel.updateById,
	})
	.use(authGuard)
	.get(
		"",
		({ query }) => {
			return getAllProductsUseCase(query);
		},
		{
			query: ProductsModel.getAllParams,
			response: withAuthErrors({
				[STATUS.OK]: ProductsModel.paginated,
				[STATUS.UNPROCESSABLE_ENTITY]:
					ERROR_RESPONSES[STATUS.UNPROCESSABLE_ENTITY],
			}),
			detail: {
				description: "Get products with pagination.",
				responses: withAuthErrorDescription({
					[STATUS.OK]: {
						description: "Products retrieved successfully.",
					},
					[STATUS.UNPROCESSABLE_ENTITY]: {
						description: "Invalid pagination parameters.",
					},
				}),
			},
		},
	)
	.get(
		"/:slug",
		({ params }) => {
			return getProductBySlugUseCase(params.slug);
		},
		{
			params: ProductsModel.bySlugParams,
			response: withAuthErrors({
				[STATUS.OK]: ProductsModel.entity,
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
			}),
			detail: {
				description: "Get a product by slug.",
				responses: withAuthErrorDescription({
					[STATUS.OK]: {
						description: "Product retrieved successfully.",
					},
					[STATUS.NOT_FOUND]: {
						description: "Product not found.",
					},
				}),
			},
		},
	)
	.post(
		"",
		async ({ body, status }) => {
			const product = await createProductUseCase(body);
			return status(STATUS.CREATED, product);
		},
		{
			body: ProductsModel.create,
			response: withAuthErrors({
				[STATUS.CREATED]: ProductsModel.entity,
				[STATUS.CONFLICT]: ERROR_RESPONSES[STATUS.CONFLICT],
			}),
			detail: {
				description: "Create a new product.",
				responses: withAuthErrorDescription({
					[STATUS.CREATED]: {
						description: "Product created successfully.",
					},
					[STATUS.CONFLICT]: {
						description: "Product with same slug already exists.",
					},
				}),
			},
		},
	)
	.delete(
		"/:id",
		async ({ params, status }) => {
			await deleteProductByIdUseCase(params.id);
			return status(STATUS.NO_CONTENT, void 0);
		},
		{
			params: ProductsModel.byIdParams,
			response: withAuthErrors({
				[STATUS.NO_CONTENT]: t.Void(),
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
			}),
			detail: {
				description: "Delete a product by id.",
				responses: withAuthErrorDescription({
					[STATUS.NO_CONTENT]: {
						description: "Product deleted successfully.",
					},
					[STATUS.NOT_FOUND]: {
						description: "Product not found.",
					},
				}),
			},
		},
	)
	.patch(
		"/:id",
		async ({ params, body, status }) => {
			const product = await updateProductByIdUseCase(params.id, body);
			return status(STATUS.OK, product);
		},
		{
			params: ProductsModel.byIdParams,
			body: ProductsModel.updateById,
			response: withAuthErrors({
				[STATUS.OK]: ProductsModel.entity,
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
				[STATUS.UNPROCESSABLE_ENTITY]:
					ERROR_RESPONSES[STATUS.UNPROCESSABLE_ENTITY],
				[STATUS.CONFLICT]: ERROR_RESPONSES[STATUS.CONFLICT],
			}),
			detail: {
				description: "Update a product by id.",
				responses: withAuthErrorDescription({
					[STATUS.OK]: {
						description: "Product updated successfully.",
					},
					[STATUS.NOT_FOUND]: {
						description: "Product not found.",
					},
					[STATUS.UNPROCESSABLE_ENTITY]: {
						description: "Invalid product data.",
					},
					[STATUS.CONFLICT]: {
						description: "Product with same slug already exists.",
					},
				}),
			},
		},
	);
