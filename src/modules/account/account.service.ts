import Db from '../../core/db/db';
import { Account } from './account.type';

export class AccountService {
	public async search(): Promise<Account[]> {
		try {
			const db = await Db.getClient();

			const accountCollection = db.collections.get('Account');

			const { objects } = await accountCollection.query.fetchObjects();

			return objects.map((account) => {
				const { uuid, properties } = account;

				return {
					id: uuid,
					...properties,
				} as Account;
			});
		} catch (error) {
			throw new Error('Error getting accounts');
		}
	}

	public async getOne(id: string): Promise<Account> {
		try {
			const db = await Db.getClient();

			const accountCollection = db.collections.get('Account');

			const { objects } = await accountCollection.query.fetchObjects({
				limit: 1,
				filters: accountCollection.filter.byId().equal(id),
			});

			const { uuid, properties } = objects[0];

			return {
				id: uuid,
				...properties,
			} as Account;
		} catch (error) {
			throw new Error('Error getting account');
		}
	}
}
