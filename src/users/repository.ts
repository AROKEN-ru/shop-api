import { eq } from "drizzle-orm";
import { db } from "@/db";
import type { UsersModel } from "@/users/model";
import { usersTable } from "@/users/schema";

export abstract class UsersRepository {
	static async create(data: UsersModel.Create): Promise<UsersModel.Entity> {
		const [user] = await db.insert(usersTable).values(data).returning();
		return user;
	}

	static async getById(id: number): Promise<UsersModel.Entity | undefined> {
		return this.getByField("id", id);
	}

	static async getByEmail(
		email: string,
	): Promise<UsersModel.Entity | undefined> {
		return this.getByField("email", email);
	}

	private static async getByField(
		field: keyof UsersModel.Entity,
		value: UsersModel.Entity[typeof field],
	): Promise<UsersModel.Entity | undefined> {
		const user = await db.query.users.findFirst({
			where: eq(usersTable[field], value),
		});
		return user;
	}
}
