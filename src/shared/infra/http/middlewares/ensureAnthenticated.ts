import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token is missing", 401);
	}

	const [, token] = authHeader.split(" ");

	const { secret_token } = auth;

	try {
		const { sub: user_id } = verify(token, secret_token) as IPayload;

		req.user = {
			id: user_id
		};

		next();
	} catch {
		throw new AppError("Invalid token!", 401);
	}
}
