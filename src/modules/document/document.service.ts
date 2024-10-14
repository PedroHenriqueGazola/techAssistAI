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

	public async upload(data: {
		title: string;
		content: string;
		equipmentId: string;
		accountId: string;
	}): Promise<Document> {
		try {
			const db = await Db.getClient();

			const documentCollection = db.collections.get('Document');

			const sections = data.content
				.split('\n\n')
				.map((section) => section.trim())
				.filter((section) => section.length > 0);

			const documentId = await documentCollection.data.insert({
				properties: {
					title: data.title,
				},
				references: {
					equipmentId: data.equipmentId,
					accountId: data.accountId,
				},
			});

			const promises = sections.map(async (section, index) => {
				const uuid = await documentCollection.data.insert({
					properties: {
						title: `${data.title} - Section ${index + 1}`,
						content: section,
					},
					references: {
						equipmentId: data.equipmentId,
						accountId: data.accountId,
					},
				});
				return uuid;
			});

			const uuids = await Promise.all(promises);

			return {
				id: uuids[0],
				title: data.title,
				content: sections.join(' '),
				equipmentId: data.equipmentId,
				accountId: data.accountId,
			} as Document;
		} catch (error) {
			throw new Error('Error uploading document');
		}
	}
}
