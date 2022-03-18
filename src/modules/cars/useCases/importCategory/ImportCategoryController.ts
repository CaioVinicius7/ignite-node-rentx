import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { file } = req;

		// Faz a injeção de dependencia da classe ImportCategoryUseCase na const
		const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

		await importCategoryUseCase.execute(file);

		return res.status(201).send();
	}
}

export { ImportCategoryController };
