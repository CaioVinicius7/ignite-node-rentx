import { getRepository, Repository } from "typeorm";

import {
	ICategoriesRepository,
	ICreateCategoryDTO
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/category";

class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	constructor() {
		this.repository = getRepository(Category);
	}

	async create({ description, name }: ICreateCategoryDTO): Promise<Category> {
		const category = this.repository.create({
			description,
			name
		});

		await this.repository.save(category);

		return category;
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();
		return categories;
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.repository.findOne({
			name
		});

		return category;
	}

	async findById(id: string): Promise<Category> {
		const category = await this.repository.findOne(id);

		return category;
	}

	async delete(id: string): Promise<void> {
		await this.repository.delete(id);
	}
}

export { CategoriesRepository };
