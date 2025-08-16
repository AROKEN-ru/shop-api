import Elysia, { t } from "elysia";
import { authGuard } from "@/auth/guard";
import { ERROR_RESPONSES, withAuthErrors } from "@/common/errorResponses";
import { STATUS } from "@/common/statusCodes";
import { ProductsModel } from "@/products/model";
import {
	createProductUseCase,
	deleteProductByIdUseCase,
	getAllProductsUseCase,
	getProductBySlugUseCase,
	updateProductByIdUseCase,
} from "@/products/usecase";

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
		({ body, set }) => {
			set.status = STATUS.CREATED;
			return createProductUseCase(body);
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
		({ params, set }) => {
			set.status = STATUS.NO_CONTENT;
			deleteProductByIdUseCase(params.id);
		},
		{
			params: ProductsModel.byIdParams,
			response: withAuthErrors({
				[STATUS.NO_CONTENT]: t.Object({}),
				[STATUS.NOT_FOUND]: ERROR_RESPONSES[STATUS.NOT_FOUND],
			}),
			detail: {
				description: "Delete a product by id.",
			},
		},
	)
	.patch(
		"/:id",
		({ params, body }) => {
			return updateProductByIdUseCase(params.id, body);
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
