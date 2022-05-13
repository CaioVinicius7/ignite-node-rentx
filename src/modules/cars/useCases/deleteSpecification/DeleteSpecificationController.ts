import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteSpecificationUseCase } from "./DeleteSpecificationUseCase";

class DeleteSpecificationController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleteSpecificationUseCase = container.resolve(
			DeleteSpecificationUseCase
		);

		await deleteSpecificationUseCase.execute(id);

		return res.status(200).send();
	}
}

export { DeleteSpecificationController };
