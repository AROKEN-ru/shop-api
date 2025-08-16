import { asc, count, desc, eq, inArray, like, or, sql } from "drizzle-orm";
import { db } from "@/db";
import type { ProductsModel } from "./model";
import { productsTable } from "./schema";

export abstract class ProductsRepository {
	static async getAll({
		page = 1,
		limit = 10,
		search = "",
		sort,
	}: ProductsModel.GetAllParams): Promise<ProductsModel.Paginated> {
		const maxLimit = 50;
		const safeLimit = Math.min(limit, maxLimit);
		const offset = (page - 1) * safeLimit;

		const searchFilter = search
			? or(
					like(sql`lower(${productsTable.name})`, `%${search.toLowerCase()}%`),
					like(
						sql`lower(${productsTable.description})`,
						`%${search.toLowerCase()}%`,
					),
				)
			: undefined;

		const orderBy =
			sort === "desc"
				? desc(productsTable.price)
				: sort === "asc"
					? asc(productsTable.price)
					: undefined;

		const items = await db
			.select()
			.from(productsTable)
			.where(searchFilter)
			.orderBy(...(orderBy ? [orderBy] : []))
			.limit(safeLimit)
			.offset(offset);

		const [totalProducts] = await db
			.select({ count: count(productsTable.id) })
			.from(productsTable)
			.where(searchFilter);

		const total = totalProducts.count;

		return {
			items,
			page,
			total,
			limit: safeLimit,
			totalPages: Math.ceil(total / safeLimit),
		};
	}

	static async getBySlug(
		slug: string,
	): Promise<ProductsModel.Entity | undefined> {
		const user = await db.query.products.findFirst({
			where: eq(productsTable.slug, slug),
		});
		return user;
	}

	static async getById(id: number): Promise<ProductsModel.Entity | undefined> {
		const product = await db.query.products.findFirst({
			where: eq(productsTable.id, id),
		});
		return product;
	}

	static async create(
		data: ProductsModel.Create,
	): Promise<ProductsModel.Entity> {
		const [product] = await db.insert(productsTable).values(data).returning();
		return product;
	}

	static async createMany(
		products: ProductsModel.Create[],
	): Promise<ProductsModel.Entity[]> {
		if (products.length === 0) {
			return [];
		}

		const existingSlugs = await db
			.select({ slug: productsTable.slug })
			.from(productsTable)
			.where(
				inArray(
					productsTable.slug,
					products.map((p) => p.slug),
				),
			);

		const existingSlugSet = new Set(existingSlugs.map((item) => item.slug));

		const newProducts = products.filter((p) => !existingSlugSet.has(p.slug));

		if (newProducts.length === 0) {
			return [];
		}

		const createdProducts = await db
			.insert(productsTable)
			.values(newProducts)
			.returning();

		return createdProducts;
	}

	static async deleteById(id: number): Promise<void> {
		await db.delete(productsTable).where(eq(productsTable.id, id));
	}

	static async updateById(
		id: number,
		data: Partial<ProductsModel.Create>,
	): Promise<ProductsModel.Entity> {
		const [updatedProduct] = await db
			.update(productsTable)
			.set({ ...data, updatedAt: sql`CURRENT_TIMESTAMP` })
			.where(eq(productsTable.id, id))
			.returning();

		return updatedProduct;
	}
}
