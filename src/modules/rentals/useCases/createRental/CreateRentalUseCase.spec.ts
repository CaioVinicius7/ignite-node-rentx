import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
	});

	it("Should to be able to create a new rental", async () => {
		await createRentalUseCase.execute({
			user_id: "12345",
			car_id: "121212",
			expected_return_date: new Date()
		});
	});
});
