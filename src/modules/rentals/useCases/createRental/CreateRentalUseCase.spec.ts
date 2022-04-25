import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
	const dayAdd24hours = dayjs().add(1, "day").toDate();

	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		dayJsDateProvider = new DayJsDateProvider();
		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			carsRepositoryInMemory,
			dayJsDateProvider
		);
	});

	it("Should to be able to create a new rental", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Test",
			description: "Car Test",
			daily_rate: 100,
			license_plate: "GTD-4234",
			fine_amount: 40,
			category_id: "2444",
			brand: "Brand"
		});

		const rental = await createRentalUseCase.execute({
			user_id: "12345",
			car_id: car.id,
			expected_return_date: dayAdd24hours
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("Should be able to create a new rental", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Test",
			description: "Car Test",
			daily_rate: 100,
			license_plate: "GTD-4234",
			fine_amount: 40,
			category_id: "2444",
			brand: "Brand"
		});
		const rental = await createRentalUseCase.execute({
			user_id: "12345",
			car_id: car.id,
			expected_return_date: dayAdd24hours
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("Should not be able to create a new rental if there is another open to the same user", () => {
		expect(async () => {
			await rentalsRepositoryInMemory.create({
				user_id: "12345",
				car_id: "1111",
				expected_return_date: dayAdd24hours
			});

			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "121212",
				expected_return_date: dayAdd24hours
			});
		}).rejects.toEqual(new AppError("There's a rental in progress for user!"));
	});

	it("Should not be able to create a new rental if there is another open to the same car", () => {
		expect(async () => {
			await rentalsRepositoryInMemory.create({
				user_id: "12345",
				car_id: "test",
				expected_return_date: dayAdd24hours
			});

			await createRentalUseCase.execute({
				user_id: "123",
				car_id: "test",
				expected_return_date: dayAdd24hours
			});
		}).rejects.toEqual(new AppError("Car is unavailable"));
	});

	it("Should not be able to create a new rental with a invalid return time", () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "321",
				car_id: "test",
				expected_return_date: dayjs().toDate()
			});
		}).rejects.toEqual(new AppError("Invalid return time!"));
	});
});
