import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCarUseCase {
	constructor(
		@inject("CarsRepository")
		private carsRepository: ICarsRepository
	) {}

	async execute(id: string): Promise<void> {
		const car = await this.carsRepository.findById(id);

		if (!car) {
			throw new AppError("Car does not exists!", 404);
		}

		if (!car.available) {
			throw new AppError(
				"Car cannot be excluded because involved in an rental currently"
			);
		}

		await this.carsRepository.delete(id);
	}
}

export { DeleteCarUseCase };
