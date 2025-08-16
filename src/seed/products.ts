import type { ProductsModel } from "@/products/model";
import { createManyProductsUseCase } from "@/products/usecase";

const seedProducts: ProductsModel.Create[] = [
	{
		name: "Беспроводные наушники AirPods Pro",
		description:
			"Профессиональные беспроводные наушники с активным шумоподавлением и превосходным качеством звука",
		price: 249.99,
		slug: "wireless-airpods-pro",
		img: "https://picsum.photos/seed/1/300/300",
	},
	{
		name: "Смартфон iPhone 15 Pro",
		description:
			"Флагманский смартфон с титановым корпусом, камерой Pro и чипом A17 Pro",
		price: 999.99,
		slug: "iphone-15-pro",
		img: "https://picsum.photos/seed/2/300/300",
	},
	{
		name: "Ноутбук MacBook Air M2",
		description:
			"Тонкий и легкий ноутбук с чипом M2, 13-дюймовым дисплеем и до 18 часов автономной работы",
		price: 1199.99,
		slug: "macbook-air-m2",
		img: "https://picsum.photos/seed/3/300/300",
	},
	{
		name: "Механическая клавиатура Keychron K2",
		description:
			"Беспроводная механическая клавиатура с подсветкой RGB и переключателями Gateron",
		price: 89.99,
		slug: "keychron-k2-keyboard",
		img: "https://picsum.photos/seed/4/300/300",
	},
	{
		name: "Игровая мышь Logitech G Pro X",
		description:
			"Профессиональная игровая мышь с сенсором HERO 25K и программируемыми кнопками",
		price: 79.99,
		slug: "logitech-g-pro-x-mouse",
		img: "https://picsum.photos/seed/5/300/300",
	},
	{
		name: "Монитор Samsung Odyssey G7",
		description:
			"32-дюймовый изогнутый игровой монитор QLED с частотой 240 Гц и разрешением 2K",
		price: 649.99,
		slug: "samsung-odyssey-g7-monitor",
		img: "https://picsum.photos/seed/6/300/300",
	},
	{
		name: "Умные часы Apple Watch Series 9",
		description:
			"Умные часы с GPS, Always-On дисплеем Retina и расширенными функциями здоровья",
		price: 399.99,
		slug: "apple-watch-series-9",
		img: "https://picsum.photos/seed/7/300/300",
	},
	{
		name: "Планшет iPad Pro 12.9",
		description:
			"Профессиональный планшет с чипом M2, Liquid Retina XDR дисплеем и поддержкой Apple Pencil",
		price: 1099.99,
		slug: "ipad-pro-12-9",
		img: "https://picsum.photos/seed/8/300/300",
	},
	{
		name: "Игровая консоль PlayStation 5",
		description:
			"Консоль нового поколения с SSD, 3D-звуком и поддержкой игр в разрешении 4K",
		price: 499.99,
		slug: "playstation-5-console",
		img: "https://picsum.photos/seed/9/300/300",
	},
	{
		name: "Смарт-телевизор LG OLED C3",
		description:
			"55-дюймовый OLED телевизор 4K с AI-процессором α9 Gen6 и поддержкой HDR",
		price: 1299.99,
		slug: "lg-oled-c3-tv",
		img: "https://picsum.photos/seed/10/300/300",
	},
	{
		name: "Кофемашина Nespresso Vertuo",
		description:
			"Автоматическая кофемашина с технологией Centrifusion для приготовления идеального кофе",
		price: 199.99,
		slug: "nespresso-vertuo-coffee",
		img: "https://picsum.photos/seed/11/300/300",
	},
	{
		name: "Робот-пылесос iRobot Roomba j7+",
		description:
			"Умный робот-пылесос с системой самоочистки и технологией избегания препятствий",
		price: 599.99,
		slug: "irobot-roomba-j7-plus",
		img: "https://picsum.photos/seed/12/300/300",
	},
	{
		name: "Портативная колонка JBL Charge 5",
		description:
			"Водонепроницаемая Bluetooth-колонка с мощным звуком и функцией powerbank",
		price: 149.99,
		slug: "jbl-charge-5-speaker",
		img: "https://picsum.photos/seed/13/300/300",
	},
	{
		name: "Фитнес-браслет Fitbit Charge 6",
		description:
			"Продвинутый фитнес-трекер с GPS, мониторингом сердечного ритма и анализом сна",
		price: 159.99,
		slug: "fitbit-charge-6-tracker",
		img: "https://picsum.photos/seed/14/300/300",
	},
	{
		name: "Электросамокат Xiaomi Mi Pro 2",
		description:
			"Складной электросамокат с дальностью до 45 км, LED-дисплеем и двойной тормозной системой",
		price: 449.99,
		slug: "xiaomi-mi-pro-2-scooter",
		img: "https://picsum.photos/seed/15/300/300",
	},
	{
		name: "Экшн-камера GoPro Hero 12",
		description:
			"Компактная экшн-камера 5.3K с HyperSmooth стабилизацией и водонепроницаемостью",
		price: 399.99,
		slug: "gopro-hero-12-camera",
		img: "https://picsum.photos/seed/16/300/300",
	},
	{
		name: "Беспроводное зарядное устройство MagSafe",
		description:
			"Официальное беспроводное зарядное устройство Apple с магнитным креплением",
		price: 39.99,
		slug: "magsafe-wireless-charger",
		img: "https://picsum.photos/seed/17/300/300",
	},
	{
		name: "Игровое кресло Herman Miller x Logitech",
		description:
			"Эргономичное игровое кресло премиум-класса с поддержкой осанки и регулировками",
		price: 1395.99,
		slug: "herman-miller-gaming-chair",
		img: "https://picsum.photos/seed/18/300/300",
	},
	{
		name: "Умная лампа Philips Hue",
		description:
			"RGB LED лампа с управлением через приложение, поддержкой голосовых команд и сценариев",
		price: 49.99,
		slug: "philips-hue-smart-bulb",
		img: "https://picsum.photos/seed/19/300/300",
	},
	{
		name: "Электрическая зубная щетка Oral-B iO9",
		description:
			"Премиальная электрическая зубная щетка с ИИ-технологией и интерактивным дисплеем",
		price: 299.99,
		slug: "oral-b-io9-toothbrush",
		img: "https://picsum.photos/seed/20/300/300",
	},
];

export const seedProductsData = async (): Promise<void> => {
	await createManyProductsUseCase(seedProducts);
};
