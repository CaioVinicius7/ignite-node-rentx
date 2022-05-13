import { getRepository, Repository } from "typeorm";

import {
	ICreateSpecificationDTO,
	ISpecificationRepository
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/specification";

class SpecificationsRepository implements ISpecificationRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = getRepository(Specification);
	}

	async create({
		name,
		description
	}: ICreateSpecificationDTO): Promise<Specification> {
		const specification = this.repository.create({
			description,
			name
		});

		await this.repository.save(specification);

		return specification;
	}

	async findByName(name: string): Promise<Specification> {
		const specification = this.repository.findOne({
			name
		});

		return specification;
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		const specifications = await this.repository.findByIds(ids);
		return specifications;
	}

	async listAllSpecifications(): Promise<Specification[]> {
		const allSpecifications = await this.repository.find();

		return allSpecifications;
	}

	async findById(id: string): Promise<Specification> {
		const specification = await this.repository.findOne(id);
		return specification;
	}

	async delete(id: string): Promise<void> {
		await this.repository.delete(id);
	}
}

export { SpecificationsRepository };
