import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImageUseCase";

interface IFiles {
	filename: string;
}

class UploadCarImagesController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const images = req.files as IFiles[];

		const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

		const images_name = images.map((file) => {
			return file.filename;
		});

		await uploadCarImagesUseCase.execute({
			car_id: id,
			images_name
		});

		return res.status(201).send();
	}
}

export { UploadCarImagesController };
