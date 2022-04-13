import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppErro";

class CreateRentalUseCase {
	constructor(private rentalsRepository: IRentalsRepository) {}

	async execute({
		user_id,
		car_id,
		expected_return_date
	}: ICreateRentalDTO): Promise<Rental> {
		const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
			car_id
		);

		if (carUnavailable) {
			throw new AppError("Car is unavailable");
		}

		const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
			user_id
		);

		if (rentalOpenToUser) {
			throw new AppError("There's a rental in progress for user!");
		}

		const rental = await this.rentalsRepository.create({
			user_id,
			car_id,
			expected_return_date
		});

		return rental;
	}
}

export { CreateRentalUseCase };
