import { Application, Response } from 'express';
import Controller, { Methods, RouteConfig } from '../../core/controller/controller';
import { AuthenticatedRequest } from '../../core/middleware/auth.type';
import { DocumentService } from './document.service';

export default class DocumentController extends Controller {
	public path = '/documents';
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
		{
			path: '',
			method: Methods.POST,
			handler: this.upload,
			localMiddleware: [],
		},
	] as RouteConfig[];

	public constructor(app: Application) {
		super(app);
	}

	public async search(req: AuthenticatedRequest, res: Response): Promise<void> {
		const { accountId } = req.authenticatedUser!;

		try {
			const documentService = new DocumentService();

			const documents = await documentService.search(accountId);

			res.status(200).json({ documents });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error });
		}
	}

	public async getOne(req: AuthenticatedRequest, res: Response): Promise<void> {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: 'ID is required' });

			return;
		}

		try {
			const documentService = new DocumentService();

			const document = await documentService.getOne(id);

			res.status(200).json({ document });
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	public async upload(req: AuthenticatedRequest, res: Response): Promise<void> {
		const { title, content, equipmentId } = req.body;
		const { accountId } = req.authenticatedUser!;

		if (!title || !content || !equipmentId || !accountId) {
			res.status(400).json({ error: 'All fields are required' });

			return;
		}

		try {
			const documentService = new DocumentService();

			const document = await documentService.upload({
				title,
				content,
				equipmentId,
				accountId,
			});

			res.status(201).json({ document });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error });
		}
	}
}
