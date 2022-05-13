import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/cars/useCases/deleteCategory/DeleteCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAnthenticated";

const categoriesRoutes = Router();

const upload = multer({
	dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.delete(
	"/:id",
	ensureAuthenticated,
	ensureAdmin,
	deleteCategoryController.handle
);

categoriesRoutes.post(
	"/import",
	ensureAuthenticated,
	ensureAdmin,
	upload.single("file"),
	importCategoryController.handle
);

export { categoriesRoutes };
