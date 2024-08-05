import Db from '../../core/db/db';
import { User } from './user.type';

export class UserService {
	public async search(): Promise<User[]> {
		try {
			const db = await Db.getClient();

			const userCollection = db.collections.get('User');

			const { objects } = await userCollection.query.fetchObjects();

			return objects.map((user) => {
				const { uuid, properties } = user;

				return {
					id: uuid,
					...properties,
				} as User;
			});
		} catch (error) {
			throw new Error('Error getting users');
		}
	}

	public async getOne(id: string): Promise<User> {
		try {
			const db = await Db.getClient();

			const userCollection = db.collections.get('User');

			const { objects } = await userCollection.query.fetchObjects({
				limit: 1,
				filters: userCollection.filter.byId().equal(id),
			});

			const { uuid, properties } = objects[0];

			return {
				id: uuid,
				...properties,
			} as User;
		} catch (error) {
			throw new Error('Error getting user');
		}
	}
}
