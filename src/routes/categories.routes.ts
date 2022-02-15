import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
	dest: "./tmp"
});

// Cria uma nova categoria
categoriesRoutes.post("/", (req, res) => {
	return createCategoryController.handle(req, res);
});

// Lista as categorias
categoriesRoutes.get("/", (req, res) => {
	return listCategoriesController.handle(req, res);
});

//
categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
	const { file } = req;
	console.log(file);
	return res.send();
});

export { categoriesRoutes };
