import { seedProductsData } from "@/seed/products";

const main = async () => {
	await seedProductsData();
	console.log("✅ Products data seeding completed successfully!");
	process.exit(0);
};

if (import.meta.main) {
	main();
}
