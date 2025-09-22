import { and, desc, eq, sql, sum } from "drizzle-orm";
import { db } from "@/db";
import { cartItemsTable, productsTable } from "@/db/schema";
import type { CartItemsModel } from "./model";

export abstract class CartItemsRepository {
	static async getByUserId({
		userId,
		page = 1,
		limit = 10,
	}: {
		userId: number;
	} & CartItemsModel.GetParams): Promise<CartItemsModel.Summary> {
		const maxLimit = 50;
		const safeLimit = Math.min(limit, maxLimit);
		const offset = (page - 1) * safeLimit;

		const items = await db
			.select({
				id: cartItemsTable.id,
				userId: cartItemsTable.userId,
				productId: cartItemsTable.productId,
				quantity: cartItemsTable.quantity,
				createdAt: cartItemsTable.createdAt,
				updatedAt: cartItemsTable.updatedAt,
				product: {
					id: productsTable.id,
					name: productsTable.name,
					slug: productsTable.slug,
					description: productsTable.description,
					img: productsTable.img,
					price: productsTable.price,
					createdAt: productsTable.createdAt,
					updatedAt: productsTable.updatedAt,
				},
			})
			.from(cartItemsTable)
			.innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
			.where(eq(cartItemsTable.userId, userId))
			.limit(safeLimit)
			.offset(offset)
			.orderBy(desc(cartItemsTable.createdAt));

		const [totalResult] = await db
			.select({
				count: sql<number>`count(*)`,
				totalItems: sum(cartItemsTable.quantity),
			})
			.from(cartItemsTable)
			.where(eq(cartItemsTable.userId, userId));

		const totalCount = totalResult.count;
		const totalItems = totalResult.totalItems || 0;

		const totalPrice = items.reduce((sum, item) => {
			return sum + item.product.price * item.quantity;
		}, 0);
		const totalPages = Math.max(1, Math.ceil(totalCount / safeLimit));

		return {
			items,
			totalItems: Number(totalItems),
			totalPrice,
			page,
			limit: safeLimit,
			totalPages,
		};
	}

	static async addOrUpdate(
		data: CartItemsModel.Add,
	): Promise<CartItemsModel.WithProduct> {
		const existingItem = await db.query.cartItems.findFirst({
			where: and(
				eq(cartItemsTable.userId, data.userId),
				eq(cartItemsTable.productId, data.productId),
			),
		});

		let itemId: number;

		if (existingItem) {
			const [updatedItem] = await db
				.update(cartItemsTable)
				.set({
					quantity: existingItem.quantity + (data.quantity || 1),
				})
				.where(eq(cartItemsTable.id, existingItem.id))
				.returning({ id: cartItemsTable.id });

			itemId = updatedItem.id;
		} else {
			const [newItem] = await db
				.insert(cartItemsTable)
				.values({
					userId: data.userId,
					productId: data.productId,
					quantity: data.quantity || 1,
				})
				.returning({ id: cartItemsTable.id });

			itemId = newItem.id;
		}

		return (await this.getWithProductById(
			itemId,
		)) as CartItemsModel.WithProduct;
	}

	static async updateQuantity(
		data: CartItemsModel.Update,
	): Promise<CartItemsModel.WithProduct | null> {
		if (data.quantity === 0) {
			await this.remove({
				userId: data.userId,
				productId: data.productId,
			});
			return null;
		}

		const [updatedItem] = await db
			.update(cartItemsTable)
			.set({ quantity: data.quantity })
			.where(
				and(
					eq(cartItemsTable.userId, data.userId),
					eq(cartItemsTable.productId, data.productId),
				),
			)
			.returning({ id: cartItemsTable.id });

		if (!updatedItem) return null;

		return (await this.getWithProductById(updatedItem.id)) || null;
	}

	static async remove(data: CartItemsModel.Remove): Promise<void> {
		await db
			.delete(cartItemsTable)
			.where(
				and(
					eq(cartItemsTable.userId, data.userId),
					eq(cartItemsTable.productId, data.productId),
				),
			);
	}

	static async clear(data: CartItemsModel.Clear): Promise<void> {
		await db
			.delete(cartItemsTable)
			.where(eq(cartItemsTable.userId, data.userId));
	}

	static async getItemByUserAndProduct(
		userId: number,
		productId: number,
	): Promise<CartItemsModel.WithProduct | undefined> {
		const item = await db.query.cartItems.findFirst({
			where: and(
				eq(cartItemsTable.userId, userId),
				eq(cartItemsTable.productId, productId),
			),
			columns: { id: true },
		});

		if (!item) return undefined;

		return await this.getWithProductById(item.id);
	}

	private static async getWithProductById(
		id: number,
	): Promise<CartItemsModel.WithProduct | undefined> {
		const [itemWithProduct] = await db
			.select({
				id: cartItemsTable.id,
				userId: cartItemsTable.userId,
				productId: cartItemsTable.productId,
				quantity: cartItemsTable.quantity,
				createdAt: cartItemsTable.createdAt,
				updatedAt: cartItemsTable.updatedAt,
				product: {
					id: productsTable.id,
					name: productsTable.name,
					slug: productsTable.slug,
					description: productsTable.description,
					img: productsTable.img,
					price: productsTable.price,
					createdAt: productsTable.createdAt,
					updatedAt: productsTable.updatedAt,
				},
			})
			.from(cartItemsTable)
			.innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
			.where(eq(cartItemsTable.id, id));

		return itemWithProduct;
	}
}
