import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

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

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository
);
