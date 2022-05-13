import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
	constructor(
		@inject("SpecificationsRepository")
		private specificationsRepository: ISpecificationRepository
	) {}

	async execute(): Promise<Specification[]> {
		const allSpecifications =
			await this.specificationsRepository.listAllSpecifications();

		return allSpecifications;
	}
}

export { ListSpecificationsUseCase };
