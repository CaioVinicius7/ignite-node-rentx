import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Password Mail", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		dateProvider = new DayJsDateProvider();
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
		mailProvider = new MailProviderInMemory();
		sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider,
			mailProvider
		);
	});

	it("Should be able to send a forgot password mail to user", async () => {
		const sendMail = jest.spyOn(mailProvider, "sendMail");

		await usersRepositoryInMemory.create({
			driver_license: "045529",
			email: "odfud@wihab.co.uk",
			name: "Myra Moreno",
			password: "1234"
		});

		await sendForgotPasswordMailUseCase.execute("odfud@wihab.co.uk");

		expect(sendMail).toHaveBeenCalled();
	});

	it("Should not be able to send an email if user does not exists", async () => {
		await expect(
			sendForgotPasswordMailUseCase.execute("pedoiz@epti.th")
		).rejects.toEqual(new AppError("User does not exists!"));
	});

	it("Should be able to create an users token", async () => {
		const generateTokenMail = jest.spyOn(
			usersTokensRepositoryInMemory,
			"create"
		);

		await usersRepositoryInMemory.create({
			driver_license: "403037",
			email: "tavsoltas@ba.vu",
			name: "Francis Richards",
			password: "1234"
		});

		await sendForgotPasswordMailUseCase.execute("tavsoltas@ba.vu");

		expect(generateTokenMail).toHaveBeenCalled();
	});
});
