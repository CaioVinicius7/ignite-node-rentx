/* eslint-disable @typescript-eslint/no-explicit-any */
import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		try {
			this.client = nodemailer.createTransport({
				SES: new SES({
					apiVersion: "2010-12-01",
					region: process.env.AWS_REGION
				})
			});
		} catch (err) {
			throw new AppError(`SES Error - ${err.message}`);
		}
	}

	async sendMail(
		to: string,
		subject: string,
		variables: any,
		path: string
	): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString("utf-8");
		const templateParse = handlebars.compile(templateFileContent);
		const templateHTML = templateParse(variables);

		await this.client.sendMail({
			to,
			from: "Rentx <caio@ignite-project.nl>",
			subject,
			html: templateHTML
		});
	}
}

export { SESMailProvider };
