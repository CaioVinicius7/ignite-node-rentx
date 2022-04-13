import { Rental } from "../infra/typeorm/entities/rental";

interface IRentalsRepository {
	findOpenRentalByCar(car_id: string): Promise<Rental>;
	findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
