import { Router } from "express";

import { Category } from "../models/category";

const categoriesRoutes = Router();

// Define que categories será um array de Category
const categories: Category[] = [];

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  // Chama o construtor para definir o id
  const category: Category = new Category();

  // Adiciona as atributos ao objeto
  Object.assign(category, {
    name,
    description,
    created_at: new Date()
  });

  categories.push(category);

  return res.status(201).send();
});

export { categoriesRoutes };
