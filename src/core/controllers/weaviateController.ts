import { Request, Response } from 'express';
import WeaviateService from '../services/weaviateService';

class WeaviateController {
	private weaviateService: WeaviateService;

	constructor() {
		this.weaviateService = new WeaviateService();
	}

	async searchSolution(req: Request, res: Response): Promise<void> {
		const { serialNumber, description } = req.body;

		try {
			const solution = await this.weaviateService.searchSolution(
				serialNumber,
				description,
			);

			res.status(200).json({ solution });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}

export default WeaviateController;
