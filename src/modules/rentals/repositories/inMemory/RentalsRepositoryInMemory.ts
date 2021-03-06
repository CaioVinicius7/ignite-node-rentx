import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
	rentals: Rental[] = [];

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		const rental = this.rentals.find((rental) => {
			return rental.car_id === car_id && !rental.end_date;
		});

		return rental;
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		const rental = this.rentals.find((rental) => {
			return rental.user_id === user_id && !rental.end_date;
		});

		return rental;
	}

	async create({
		user_id,
		car_id,
		expected_return_date
	}: ICreateRentalDTO): Promise<Rental> {
		const rental = new Rental();

		Object.assign(rental, {
			user_id,
			car_id,
			expected_return_date,
			start_date: new Date()
		});

		this.rentals.push(rental);

		return rental;
	}

	async findById(id: string): Promise<Rental> {
		return this.rentals.find((rental) => rental.id === id);
	}

	async findByUser(user_id: string): Promise<Rental[]> {
		return this.rentals.filter((rental) => rental.user_id === user_id);
	}
}

export { RentalsRepositoryInMemory };
