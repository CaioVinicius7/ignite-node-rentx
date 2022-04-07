import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
	});

	it("Should be able to list all available cars", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car 1",
			description: "Car description",
			daily_rate: 140.0,
			license_plate: "DEF-1234",
			fine_amount: 100,
			brand: "Car_brand",
			category_id: "Caategory_id"
		});

		const cars = await listCarsUseCase.execute({});

		expect(cars).toEqual([car]);
	});

	it("Should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car 2",
			description: "Car description",
			daily_rate: 140.0,
			license_plate: "DEF-1234",
			fine_amount: 100,
			brand: "Car_brand_test",
			category_id: "Caategory_id"
		});

		const cars = await listCarsUseCase.execute({
			brand: "Car_brand_test"
		});

		expect(cars).toEqual([car]);
	});
});
