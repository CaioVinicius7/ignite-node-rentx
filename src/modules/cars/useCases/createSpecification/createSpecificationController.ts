import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { name, description } = req.body;

		// Faz a injeção de dependencia da classe CreateSpecificationUseCase na const
		const createSpecificationUseCase = container.resolve(
			CreateSpecificationUseCase
		);

		await createSpecificationUseCase.execute({ name, description });

		return res.status(201).send();
	}
}

export { CreateSpecificationController };
