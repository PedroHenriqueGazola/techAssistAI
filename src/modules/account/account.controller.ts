import { Application, Request, Response } from 'express';
import Controller, {
	Methods,
	RouteConfig,
} from '../../core/controller/controller';
import { AccountService } from './account.service';

export default class AccountController extends Controller {
	public path = '/accounts';
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
			const accountService = new AccountService();

			const accounts = await accountService.search();

			res.status(200).json({ accounts });
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
			const accountService = new AccountService();

			const account = await accountService.getOne(id);

			res.status(200).json({ account });
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}
