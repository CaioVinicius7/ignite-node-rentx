import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAnthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

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

export { specificationRoutes };
