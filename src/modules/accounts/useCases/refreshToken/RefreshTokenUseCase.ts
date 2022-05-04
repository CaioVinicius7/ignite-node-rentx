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

interface ITokenResponse {
	token: string;
	refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,
		@inject("DayJsDateProvider")
		private dateProvider: IDateProvider
	) {}

	async execute(token: string): Promise<ITokenResponse> {
		const { email, sub } = verify(
			token,
			process.env.SECRET_REFRESH_TOKEN
		) as IPayload;

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
			expires_in_refresh_token,
			expires_refresh_token_days,
			expires_in_token
		} = auth;

		const refresh_token = sign(
			{
				email
			},
			process.env.SECRET_REFRESH_TOKEN,
			{
				subject: user_id,
				expiresIn: expires_in_refresh_token
			}
		);

		const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

		await this.usersTokensRepository.create({
			user_id,
			refresh_token,
			expires_date
		});

		const newToken = sign({}, process.env.SECRET_TOKEN, {
			subject: user_id,
			expiresIn: expires_in_token
		});

		return {
			refresh_token,
			token: newToken
		};
	}
}

export { RefreshTokenUseCase };
