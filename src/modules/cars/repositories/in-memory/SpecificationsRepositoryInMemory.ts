import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

import {
	ICreateSpecificationDTO,
	ISpecificationRepository
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
	specifications: Specification[] = [];

	async create({
		description,
		name
	}: ICreateSpecificationDTO): Promise<Specification> {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description
		});

		this.specifications.push(specification);

		return specification;
	}

	async findByName(name: string): Promise<Specification> {
		return this.specifications.find(
			(specification) => specification.name === name
		);
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		const allSpecifications = this.specifications.filter((specification) =>
			ids.includes(specification.id)
		);

		return allSpecifications;
	}

	async listAllSpecifications(): Promise<Specification[]> {
		const allSpecifications = this.specifications;
		return allSpecifications;
	}

	async findById(id: string): Promise<Specification> {
		return this.specifications.find((specification) => specification.id === id);
	}

	async delete(id: string): Promise<void> {
		const specification = this.specifications.findIndex(
			(specification) => specification.id === id
		);
		this.specifications.splice(specification);
	}
}

export { SpecificationsRepositoryInMemory };
