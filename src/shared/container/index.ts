import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

/* Toda vez que for chamado CategoriesRepository com o inject será
   resposavel por instanciar a clasee CategoriesRepository */

container.registerSingleton<ICategoriesRepository>(
	"CategoriesRepository",
	CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
	"SpecificationRepository",
	SpecificationRepository
);
