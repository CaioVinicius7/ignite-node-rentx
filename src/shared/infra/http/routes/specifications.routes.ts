import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAnthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
