import { Category } from "@modules/cars/infra/typeorm/entities/category";

import {
	ICategoriesRepository,
	ICreateCategoryDTO
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	categories: Category[] = [];

	async findByName(name: string): Promise<Category> {
		const category = this.categories.find((category) => {
			return category.name === name;
		});

		return category;
	}

	async list(): Promise<Category[]> {
		const list = this.categories;
		return list;
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
		const category = new Category();

		Object.assign(category, {
			name,
			description
		});

		this.categories.push(category);

		return category;
	}

	async findById(id: string): Promise<Category> {
		return this.categories.find((category) => category.id === id);
	}

	async delete(id: string): Promise<void> {
		const category = this.categories.findIndex(
			(category) => category.id === id
		);
		this.categories.splice(category);
	}
}

export { CategoriesRepositoryInMemory };
