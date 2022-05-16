import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCarUseCase } from "./DeleteCarUseCase";

class DeleteCarController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleteCarUseCase = container.resolve(DeleteCarUseCase);

		await deleteCarUseCase.execute(id);

		return res.status(200).send();
	}
}

export { DeleteCarController };
