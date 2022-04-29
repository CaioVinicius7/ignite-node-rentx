import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUserCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;

let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
		dateProvider = new DayJsDateProvider();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider
		);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("Should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			driver_license: "000123",
			email: "user@test.com",
			password: "1234",
			name: "User Test"
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password
		});

		expect(result).toHaveProperty("token");
	});

	it("Should not be able to authenticate an nonexistent user", async () => {
		await expect(
			authenticateUserUseCase.execute({
				email: "false@email.com",
				password: "1234"
			})
		).rejects.toEqual(new AppError("Email or password incorrect!"));
	});

	it("Should not be able to authenticate with incorrect password", async () => {
		const user: ICreateUserDTO = {
			driver_license: "9999",
			email: "user@user.com",
			password: "1234",
			name: "User Test Error"
		};

		await createUserUseCase.execute(user);

		await expect(
			authenticateUserUseCase.execute({
				email: user.email,
				password: "incorrectPassword"
			})
		).rejects.toEqual(new AppError("Email or password incorrect!"));
	});
});
