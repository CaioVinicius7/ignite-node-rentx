import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErro";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
	const dayAdd24hours = dayjs().add(1, "day").toDate();

	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
	});

	it("Should to be able to create a new rental", async () => {
		const rental = await createRentalUseCase.execute({
			user_id: "12345",
			car_id: "121212",
			expected_return_date: dayAdd24hours
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("Should not be able to create a new rental if there is another open to the same user", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "121212",
				expected_return_date: dayAdd24hours
			});

			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "131313",
				expected_return_date: dayAdd24hours
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("Should not be able to create a new rental if there is another open to the same car", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "121212",
				expected_return_date: dayAdd24hours
			});

			await createRentalUseCase.execute({
				user_id: "54321",
				car_id: "121212",
				expected_return_date: dayAdd24hours
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("Should not be able to create a new rental with invalid return time", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "121212",
				expected_return_date: dayjs().toDate()
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
