import { Category } from "../models/category";

// DTO => data transfer object
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

class CategoriesRepository {
	// Define que categories será um array privado de Category
	private categories: Category[];

	constructor() {
		// Define categories como um array vazio ao inicializar a classe
		this.categories = [];
	}

	crete({ description, name }: ICreateCategoryDTO): void {
		// Chama o construtor para definir o id
		const category: Category = new Category();

		// Adiciona as atributos ao objeto
		Object.assign(category, {
			name,
			description,
			created_at: new Date()
		});

		this.categories.push(category);
	}

	list(): Category[] {
		return this.categories;
	}

	findByName(name: string): Category {
		const category = this.categories.find((category) => {
			return category.name === name;
		});

		return category;
	}
}

export { CategoriesRepository };
