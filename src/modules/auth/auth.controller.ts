import { Application, Request, Response } from 'express';
import Controller, {
	Methods,
	RouteConfig,
} from '../../core/controller/controller';
import { AuthService } from './auth.service';

export default class AuthController extends Controller {
	public path = '/auth';
	public routes = [
		{
			path: '/sign-in',
			method: Methods.POST,
			handler: this.signIn,
			localMiddleware: [],
		},
	] as RouteConfig[];

	public constructor(app: Application) {
		super(app);
	}

	public async signIn(req: Request, res: Response): Promise<void> {
		const authService = new AuthService();

		const { valid, error } = authService.validateSignInRequest(req);

		if (!valid) {
			res.status(400).json({ error });
			return;
		}

		const { email, password } = req.body;

		try {
			const token = await authService.signIn({
				email,
				password,
			});

			res.status(200).json({ token });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error });
		}
	}
}
