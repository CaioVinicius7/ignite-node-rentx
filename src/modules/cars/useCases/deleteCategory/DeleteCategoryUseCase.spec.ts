import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

let deleteCategoryUseCase: DeleteCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Delete Specification", () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		deleteCategoryUseCase = new DeleteCategoryUseCase(
			categoriesRepositoryInMemory
		);
	});

	it("Should be able to delete a category", async () => {
		const category = await categoriesRepositoryInMemory.create({
			name: "Test Specification",
			description: "Test Description"
		});

		await deleteCategoryUseCase.execute(category.id);

		const result = await categoriesRepositoryInMemory.findById(category.id);

		expect(result).toEqual(undefined);
		expect(result).toEqual(expect.not.objectContaining(category));
	});

	it("Should not be to delete a nonexistent category", async () => {
		await expect(deleteCategoryUseCase.execute("123456")).rejects.toEqual(
			new AppError("Category does not exists!", 404)
		);
	});
});
