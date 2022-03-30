// Sobrescreve o Request do express adicionando uma nova propiedade
declare namespace Express {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export interface Request {
		user: {
			id: string;
		};
	}
}
