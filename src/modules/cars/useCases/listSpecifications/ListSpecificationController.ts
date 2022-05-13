import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
	async handle(req: Request, res: Response): Promise<Response> {
		const listCarSpecificationsUseCase = container.resolve(
			ListSpecificationsUseCase
		);

		const specifications = await listCarSpecificationsUseCase.execute();

		return res.status(200).json(specifications);
	}
}

export { ListSpecificationsController };
