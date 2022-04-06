import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAnthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createSpecificationController.handle
);

export { specificationRoutes };
