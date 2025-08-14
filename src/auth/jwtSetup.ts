import jwt from "@elysiajs/jwt";
import { config } from "@/config";

export const jwtSetup = jwt({
	name: "jwt",
	secret: config.JWT_SECRET,
	exp: "14d",
});
