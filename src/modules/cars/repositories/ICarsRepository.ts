import { ICreteCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/car";

interface ICarsRepository {
	create(data: ICreteCarDTO): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
