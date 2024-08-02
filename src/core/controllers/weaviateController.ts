import { Application, Request, Response } from 'express';
import { WeaviateService } from '../services/weaviateService';
import Controller, { Methods, RouteConfig } from './controller';

export default class WeaviateController extends Controller {
	public path = '/weaviate';
	public routes = [
		{
			path: '/search',
			method: Methods.POST,
			handler: this.searchSolution,
			localMiddleware: [],
		},
		{
			path: '/search/documents',
			method: Methods.POST,
			handler: this.searchDocuments,
			localMiddleware: [],
		},
	] as RouteConfig[];

	constructor(app: Application) {
		super(app);
	}

	async searchSolution(req: Request, res: Response): Promise<void> {
		if (!req.body) {
			res.status(400).json({ error: 'Missing request body' });
			return;
		}

		const { serialNumber, description } = req.body;

		if (!serialNumber || !description) {
			res.status(400).json({ error: 'Missing required fields' });
			return;
		}

		const weaviateService = new WeaviateService();

		try {
			const solution = await weaviateService.searchSolution(
				serialNumber,
				description,
			);

			res.status(200).json({ solution });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async searchDocuments(req: Request, res: Response): Promise<void> {
		if (!req.body) {
			res.status(400).json({ error: 'Missing request body' });
			return;
		}

		const weaviateService = new WeaviateService();

		try {
			const documents = await weaviateService.searchDocuments();

			res.status(200).json({ documents });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
