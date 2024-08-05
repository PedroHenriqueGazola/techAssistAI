import Db from '../../core/db/db';
import { Document } from './document.type';

export class DocumentService {
	public async search(): Promise<Document[]> {
		try {
			const db = await Db.getClient();

			const documentCollection = db.collections.get('Document');

			const { objects } = await documentCollection.query.fetchObjects();

			return objects.map((document) => {
				const { uuid, properties } = document;

				return {
					id: uuid,
					...properties,
				} as Document;
			});
		} catch (error) {
			throw new Error('Error getting documents');
		}
	}

	public async getOne(id: string): Promise<Document> {
		try {
			const db = await Db.getClient();

			const documentCollection = db.collections.get('Document');

			const { objects } = await documentCollection.query.fetchObjects({
				limit: 1,
				filters: documentCollection.filter.byId().equal(id),
			});

			if (!objects?.length) {
				throw new Error('Document not found');
			}

			const { uuid, properties } = objects?.[0];

			return {
				id: uuid,
				...properties,
			} as Document;
		} catch (error) {
			console.log(error);
			throw new Error('Error getting document');
		}
	}
}
