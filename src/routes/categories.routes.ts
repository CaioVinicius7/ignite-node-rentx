import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Cria uma nova categoria
categoriesRoutes.post("/", (req, res) => {
	const { name, description } = req.body;

	const createCategoryServer = new CreateCategoryService(categoriesRepository);

	createCategoryServer.execute({ name, description });

	return res.status(201).send();
});

// Lista as categorias
categoriesRoutes.get("/", (req, res) => {
	const all = categoriesRepository.list();

	return res.status(200).json(all);
});

export { categoriesRoutes };
