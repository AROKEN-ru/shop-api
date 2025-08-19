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
	): Promise<CartItemsModel.Entity> {
		const existingItem = await db.query.cartItems.findFirst({
			where: and(
				eq(cartItemsTable.userId, data.userId),
				eq(cartItemsTable.productId, data.productId),
			),
		});

		if (existingItem) {
			const [updatedItem] = await db
				.update(cartItemsTable)
				.set({
					quantity: existingItem.quantity + (data.quantity || 1),
				})
				.where(eq(cartItemsTable.id, existingItem.id))
				.returning();

			return updatedItem;
		}

		const [newItem] = await db
			.insert(cartItemsTable)
			.values({
				userId: data.userId,
				productId: data.productId,
				quantity: data.quantity || 1,
			})
			.returning();

		return newItem;
	}

	static async updateQuantity(
		data: CartItemsModel.Update,
	): Promise<CartItemsModel.Entity | null> {
		if (data.quantity === 0) {
			await this.remove({
				userId: data.userId,
				productId: data.productId,
			});
			return null;
		}

		const [updatedItem] = await db
			.update(cartItemsTable)
			.set({
				quantity: data.quantity,
			})
			.where(
				and(
					eq(cartItemsTable.userId, data.userId),
					eq(cartItemsTable.productId, data.productId),
				),
			)
			.returning();

		return updatedItem;
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
	): Promise<CartItemsModel.Entity | undefined> {
		return await db.query.cartItems.findFirst({
			where: and(
				eq(cartItemsTable.userId, userId),
				eq(cartItemsTable.productId, productId),
			),
		});
	}
}
