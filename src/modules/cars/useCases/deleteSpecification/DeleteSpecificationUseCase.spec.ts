import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleteSpecificationUseCase } from "./DeleteSpecificationUseCase";

let deleteSpecificationUseCase: DeleteSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Delete Specification", () => {
	beforeEach(() => {
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		deleteSpecificationUseCase = new DeleteSpecificationUseCase(
			specificationsRepositoryInMemory
		);
	});

	it("Should be able to delete a specification", async () => {
		const specification = await specificationsRepositoryInMemory.create({
			name: "Test Specification",
			description: "Test Description"
		});

		await deleteSpecificationUseCase.execute(specification.id);

		const result = await specificationsRepositoryInMemory.findById(
			specification.id
		);

		expect(result).toEqual(undefined);
		expect(result).toEqual(expect.not.objectContaining(specification));
	});

	it("Should not be to delete a nonexistent specification", async () => {
		await expect(deleteSpecificationUseCase.execute("123456")).rejects.toEqual(
			new AppError("Specification does not exists!", 404)
		);
	});
});
