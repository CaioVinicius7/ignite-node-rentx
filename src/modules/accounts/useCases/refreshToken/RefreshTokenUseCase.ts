import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
	sub: string;
	email: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,
		@inject("DayJsDateProvider")
		private dateProvider: IDateProvider
	) {}

	async execute(token: string): Promise<string> {
		const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

		const user_id = sub;

		const userToken =
			await this.usersTokensRepository.findByUserIdAndRefreshToken(
				user_id,
				token
			);

		if (!userToken) {
			throw new AppError("Refresh Token does not exists!");
		}

		await this.usersTokensRepository.deleteById(userToken.id);

		const {
			secret_refresh_token,
			expires_in_refresh_token,
			expires_refresh_token_days
		} = auth;

		const refresh_token = sign(
			{
				email
			},
			secret_refresh_token,
			{
				subject: sub,
				expiresIn: expires_in_refresh_token
			}
		);

		const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

		await this.usersTokensRepository.create({
			user_id,
			refresh_token,
			expires_date
		});

		return refresh_token;
	}
}

export { RefreshTokenUseCase };