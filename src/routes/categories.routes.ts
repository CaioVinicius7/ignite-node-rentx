import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// Cria uma nova categoria
categoriesRoutes.post("/", (req, res) => {
	return createCategoryController.handle(req, res);
});

// Lista as categorias
categoriesRoutes.get("/", (req, res) => {
	return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
