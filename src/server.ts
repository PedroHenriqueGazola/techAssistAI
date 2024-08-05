import cors from 'cors';
import { Application, json, urlencoded } from 'express';
import AccountController from './modules/account/account.controller';
import AuthController from './modules/auth/auth.controller';
import EquipmentController from './modules/equipment/equipment.controller';
import TechAssistController from './modules/techAssist/techAssist.controller';
import UserController from './modules/user/user.controller';
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
		new AccountController(this.app).setRoutes();
		new AuthController(this.app).setRoutes();
		new EquipmentController(this.app).setRoutes();
		new TechAssistController(this.app).setRoutes();
		new UserController(this.app).setRoutes();
	}
}
