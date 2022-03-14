import { Specification } from "../entities/specification";

interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	create({ description, name }: ICreateSpecificationDTO): void;
	findByName(name: string): Specification;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
