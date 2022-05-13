import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

let listSpecificationsUseCase: ListSpecificationsUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("List Specifications", () => {
	beforeEach(() => {
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		listSpecificationsUseCase = new ListSpecificationsUseCase(
			specificationsRepositoryInMemory
		);
	});

	it("Should be able to list all specifications", async () => {
		const specification = await specificationsRepositoryInMemory.create({
			name: "Test Specification",
			description: "Test Description"
		});

		const specifications = await listSpecificationsUseCase.execute();

		expect(specifications).toEqual([specification]);
	});
});
