import { Specification } from "../infra/typeorm/entities/specification";

interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	create({
		description,
		name
	}: ICreateSpecificationDTO): Promise<Specification>;
	findByName(name: string): Promise<Specification>;
	findByIds(ids: string[]): Promise<Specification[]>;
	listAllSpecifications(): Promise<Specification[]>;
	findById(id: string): Promise<Specification>;
	delete(id: string): Promise<void>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
