import { ICreteCarDTO } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
	create(data: ICreteCarDTO): Promise<void>;
}

export { ICarsRepository };
