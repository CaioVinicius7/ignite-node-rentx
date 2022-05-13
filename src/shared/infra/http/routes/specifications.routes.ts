import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { DeleteSpecificationController } from "@modules/cars/useCases/deleteSpecification/DeleteSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAnthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();
const deleteSpecificationController = new DeleteSpecificationController();

specificationRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createSpecificationController.handle
);

specificationRoutes.get(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	listSpecificationController.handle
);

specificationRoutes.delete(
	"/:id",
	ensureAuthenticated,
	ensureAdmin,
	deleteSpecificationController.handle
);

export { specificationRoutes };
