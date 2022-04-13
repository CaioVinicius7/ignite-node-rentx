import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";

/* Toda vez que for chamado CategoriesRepository com o inject será
   resposavel por instanciar a clasee CategoriesRepository 
	 -- Toda vez que tiver um inject irá chamar a classe --	 
*/

container.registerSingleton<ICategoriesRepository>(
	"CategoriesRepository",
	CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
	"SpecificationsRepository",
	SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
	"CarsImagesRepository",
	CarsImagesRepository
);
