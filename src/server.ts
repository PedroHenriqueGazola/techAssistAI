import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import WeaviateController from './core/controllers/weaviateController';
export class ServerController {
	private app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	public run(): void {
		const PORT = process.env.PORT || 3000;

		this.app.listen(PORT, () => {
			console.log(`Up and running on port ${PORT}`);
		});
	}

	public loadGlobalMiddleware(): void {
		this.app.use(urlencoded({ extended: false }));
		this.app.use(json());
		this.app.use(cors({ credentials: true, origin: true }));
	}

	public loadControllers(): void {
		new WeaviateController(this.app).setRoutes();
	}
}
