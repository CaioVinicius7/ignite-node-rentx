import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./database";

import "./shared/container";

import { AppError } from "./errors/appErro";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message
		});
	}

	return res.status(500).json({
		status: "Error",
		message: `Internal server error - ${err.message}`
	});
});

app.listen(3333, () => {
	console.log("*** Server is running! ***");
});
