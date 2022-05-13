import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteSpecificationUseCase {
	constructor(
		@inject("SpecificationsRepository")
		private specificationsRepository: ISpecificationRepository
	) {}

	async execute(id: string): Promise<void> {
		const specification = await this.specificationsRepository.findById(id);

		if (!specification) {
			throw new AppError("Specification does not exists!", 404);
		}

		this.specificationsRepository.delete(id);
	}
}

export { DeleteSpecificationUseCase };
