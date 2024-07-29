import { WeaviateField } from 'weaviate-client';
import Db from '../db/db';

class WeaviateService {
	constructor() {}

	public async searchSolution(
		serialNumber: string,
		problemDescription: string,
	): Promise<WeaviateField> {
		try {
			const db = await Db.getClient();

			const results = await db.collections
				.get('Document')
				.query.hybrid(problemDescription, {
					alpha: 1.0,
					limit: 1,
				});

			return results.objects[0].properties.text;
		} catch (error: any) {
			throw new Error(`Error searching for solution: ${error.message}`);
		}
	}
}

export default WeaviateService;
