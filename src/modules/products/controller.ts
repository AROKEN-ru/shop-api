import Elysia from "elysia";
import { ERROR_RESPONSES, withAuthErrors } from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";
import { authGuard } from "@/modules/auth";
import { ProductsModel } from "./model";
import {
	createProductUseCase,
	deleteProductByIdUseCase,
	getAllProductsUseCase,
	getProductBySlugUseCase,
	updateProductByIdUseCase,
} from "./usecase";

export const productsController = new Elysia({
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
			}),
			detail: {
				description: "Get products with pagination.",
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
			},
		},
	)
	.delete(
		"/:id",
		async ({ params, status }) => {
			const product = await deleteProductByIdUseCase(params.id);
			return status(STATUS.NO_CONTENT, product);
		},
		{
			params: ProductsModel.byIdParams,
			response: withAuthErrors({
				[STATUS.NO_CONTENT]: ProductsModel.entity,
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
			}),
			detail: {
				description: "Delete a product by id.",
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
			},
		},
	);
