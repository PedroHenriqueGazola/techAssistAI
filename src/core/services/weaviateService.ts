import { WeaviateField, WeaviateNonGenericObject } from 'weaviate-client';
import Db from '../db/db';

export class WeaviateService {
	constructor() {}

	public async searchSolution(
		serialNumber: string,
		problemDescription: string,
	): Promise<WeaviateField> {
		try {
			const db = await Db.getClient();

			const results = await db.collections
				.get('Document')
				.query.hybrid(serialNumber, {
					alpha: 1,
					limit: 1,
					returnMetadata: ['score'],
				});

			return results.objects[0].properties;
		} catch (error: any) {
			throw new Error(`Error searching for solution: ${error.message}`);
		}
	}

	public async searchDocuments(): Promise<WeaviateNonGenericObject[]> {
		try {
			const db = await Db.getClient();

			const results = await db.collections.get('Document').query.fetchObjects();

			return results.objects;
		} catch (error: any) {
			throw new Error(`Error searching for documents: ${error.message}`);
		}
	}
}
