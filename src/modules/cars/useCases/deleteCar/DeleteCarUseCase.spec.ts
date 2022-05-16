import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleteCarUseCase } from "./DeleteCarUseCase";

let deleteCarUseCase: DeleteCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Delete Car", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		deleteCarUseCase = new DeleteCarUseCase(carsRepositoryInMemory);
	});

	it("Should be able to delete a car", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car test",
			brand: "Audi",
			description: "Good car",
			daily_rate: 100,
			fine_amount: 50,
			license_plate: "123456789",
			category_id: "987654321"
		});

		await deleteCarUseCase.execute(car.id);

		const result = await carsRepositoryInMemory.findById(car.id);

		expect(result).toEqual(undefined);
		expect(result).toEqual(expect.not.objectContaining(car));
	});

	it("Should not be to delete a nonexistent car", async () => {
		await expect(deleteCarUseCase.execute("123456")).rejects.toEqual(
			new AppError("Car does not exists!", 404)
		);
	});

	it("Should not be to delete a car with open rental", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car test",
			brand: "Audi",
			description: "Good car",
			daily_rate: 100,
			fine_amount: 50,
			license_plate: "123456789",
			category_id: "987654321"
		});

		await carsRepositoryInMemory.updateAvailable(car.id, false);

		await expect(deleteCarUseCase.execute(car.id)).rejects.toEqual(
			new AppError(
				"Car cannot be excluded because involved in an rental currently"
			)
		);
	});
});
