import { eq } from "drizzle-orm";
import { db } from "@/db";
import type { UsersModel } from "@/users/model";
import { usersTable } from "@/users/schema";

export abstract class UsersRepository {
	static async create(
		userToCreate: UsersModel.Create,
	): Promise<UsersModel.Entity> {
		const [user] = await db.insert(usersTable).values(userToCreate).returning();
		return user;
	}

	static async findById(id: number): Promise<UsersModel.Entity | undefined> {
		return this.findByField("id", id);
	}

	static async findByEmail(
		email: string,
	): Promise<UsersModel.Entity | undefined> {
		return this.findByField("email", email);
	}

	private static async findByField(
		field: keyof UsersModel.Entity,
		value: UsersModel.Entity[typeof field],
	): Promise<UsersModel.Entity | undefined> {
		const user = await db.query.users.findFirst({
			where: eq(usersTable[field], value),
		});
		return user;
	}
}
