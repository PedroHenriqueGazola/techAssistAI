import { Application, Request, Response } from 'express';
import Controller, { Methods, RouteConfig } from '../../controller/controller';
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
	] as RouteConfig[];

	public constructor(app: Application) {
		super(app);
	}

	public async search(req: Request, res: Response): Promise<void> {
		try {
			const documentService = new DocumentService();

			const documents = await documentService.search();

			res.status(200).json({ documents });
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
			const documentService = new DocumentService();

			const document = await documentService.getOne(id);

			res.status(200).json({ document });
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}
