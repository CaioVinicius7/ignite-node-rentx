import { Router } from "express";

import { CategoriesRepository } from "../repositories/categoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Cria uma nova categoria
categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
	
	// Verifica se já existe uma categoria cadastrada com esse nome
	const categoryAlreadyExists = categoriesRepository.findByName(name); 

	if(categoryAlreadyExists){
		return res.status(400).json({
			error: "category already exists"
		});
	}

  categoriesRepository.crete({ name, description });

  return res.status(201).send();
});

// Lista as categorias
categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();

  return res.status(200).json(all);
});

export { categoriesRoutes };
