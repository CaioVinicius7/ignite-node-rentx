import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
	async handle(req: Request, res: Response): Promise<Response> {
		// Faz a injeção de dependencia da classe ListCategoriesUseCase na const
		const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

		const all = await listCategoriesUseCase.execute();

		return res.status(200).json(all);
	}
}

export { ListCategoriesController };
