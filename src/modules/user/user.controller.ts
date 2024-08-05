import { Application, Request, Response } from 'express';
import Controller, { Methods, RouteConfig } from '../../controller/controller';
import { UserService } from './user.service';

export default class UserController extends Controller {
	public path = '/users';
	public routes = [
		{
			path: '',
			method: Methods.GET,
			handler: this.search,
			localMiddleware: [],
		},
		{
			path: '/:id',
			method: Methods.GET,
			handler: this.getOne,
			localMiddleware: [],
		},
	] as RouteConfig[];

	public constructor(app: Application) {
		super(app);
	}

	public async search(req: Request, res: Response): Promise<void> {
		try {
			const userService = new UserService();

			const users = await userService.search();

			res.status(200).json({ users });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error });
		}
	}

	public async getOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: 'ID is required' });

			return;
		}

		try {
			const userService = new UserService();

			const user = await userService.getOne(id);

			res.status(200).json({ user });
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}
