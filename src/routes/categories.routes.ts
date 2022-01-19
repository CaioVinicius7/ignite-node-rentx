import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { CreateCategoryUseCase } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Cria uma nova categoria
categoriesRoutes.post("/", (req, res) => {
	return createCategoryController.handle(req, res);
});

// Lista as categorias
categoriesRoutes.get("/", (req, res) => {
	const all = categoriesRepository.list();

	return res.status(200).json(all);
});

export { categoriesRoutes };
