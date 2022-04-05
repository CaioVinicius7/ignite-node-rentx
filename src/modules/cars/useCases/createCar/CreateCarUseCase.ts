import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErro";

@injectable()
class CreateCarUseCase {
	constructor(
		@inject("CarsRepository")
		private carsRepository: ICarsRepository
	) {}

	async execute({
		name,
		description,
		daily_rate,
		license_plate,
		fine_amount,
		brand,
		category_id
	}: ICreateCarDTO): Promise<Car> {
		const carAlreadyExists = await this.carsRepository.findByLicensePlate(
			license_plate
		);

		if (carAlreadyExists) {
			throw new AppError("Car already exists!");
		}

		const car = this.carsRepository.create({
			name,
			description,
			daily_rate,
			license_plate,
			fine_amount,
			brand,
			category_id
		});

		return car;
	}
}

export { CreateCarUseCase };
