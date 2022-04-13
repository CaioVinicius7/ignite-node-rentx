import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImageUseCase";

interface IFiles {
	filename: string;
}

class UploadCarImagesController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const image = req.files;
		console.log(
			"🚀 ~ file: UploadCarImageController.ts ~ line 14 ~ UploadCarImagesController ~ handle ~ image",
			image
		);
		const images = req.files as IFiles[];
		console.log(
			"🚀 ~ file: UploadCarImageController.ts ~ line 14 ~ UploadCarImagesController ~ handle ~ images",
			images
		);

		const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

		const images_name = images.map((file) => {
			return file.filename;
		});
		console.log(
			"🚀 ~ file: UploadCarImageController.ts ~ line 29 ~ UploadCarImagesController ~ constimages_name=images.map ~ images_name",
			images_name
		);

		await uploadCarImagesUseCase.execute({
			car_id: id,
			images_name
		});

		return res.status(201).send();
	}
}

export { UploadCarImagesController };
