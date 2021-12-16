import { Router } from "express";

import { CategoryRepository } from "../repositories/categoriesRepository";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  categoryRepository.crete({ name, description });

  return res.status(201).send();
});

export { categoriesRoutes };
