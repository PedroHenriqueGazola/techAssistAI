import { Application, NextFunction, Response } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthenticatedRequest } from '../middleware/auth.type';

export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface RouteConfig {
	path: string;
	method: Methods;
	handler: (
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction,
	) => void | Promise<void>;
	localMiddleware: ((
		req: AuthenticatedRequest,
		res: Response,
		next: NextFunction,
	) => void)[];
}

export default abstract class Controller {
	public abstract path: string;
	protected readonly routes: Array<RouteConfig> = [];

	constructor(protected app: Application) {}

	public setRoutes(skipAuthMiddleware?: boolean): void {
		for (const route of this.routes) {
			const fullPath = this.path + route.path;

			if (!skipAuthMiddleware) {
				this.app.use(fullPath, AuthMiddleware);
			}

			for (const middleware of route.localMiddleware) {
				this.app.use(fullPath, middleware);
			}

			switch (route.method) {
				case 'GET':
					this.app.get(fullPath, route.handler);
					break;
				case 'POST':
					this.app.post(fullPath, route.handler);
					break;
				case 'PUT':
					this.app.put(fullPath, route.handler);
					break;
				case 'DELETE':
					this.app.delete(fullPath, route.handler);
					break;
			}
		}
	}
}
