import Db from '../../core/db/db';
import { AuthenticatedRequest } from '../../core/middleware/auth.type';
import { filterByAccount } from '../../core/utils/filter-by-account';
import { Equipment, ValidateCreateEquipmentResponse } from './equipment.type';

export class EquipmentService {
	public async search(accountId: string): Promise<Equipment[]> {
		try {
			const db = await Db.getClient();

			const equipmentCollection = db.collections.get('Equipment');

			const { objects } = await equipmentCollection.query.fetchObjects({
				filters: filterByAccount(equipmentCollection, accountId),
			});

			return objects.map((equipment) => {
				const { uuid, properties } = equipment;

				return {
					id: uuid,
					...properties,
				} as Equipment;
			});
		} catch (error) {
			throw new Error('Error getting equipments');
		}
	}

	public async getOne(id: string): Promise<Equipment> {
		try {
			const db = await Db.getClient();

			const equipmentCollection = db.collections.get('Equipment');

			const { objects } = await equipmentCollection.query.fetchObjects({
				limit: 1,
				filters: equipmentCollection.filter.byId().equal(id),
			});

			const { uuid, properties } = objects[0];

			return {
				id: uuid,
				...properties,
			} as Equipment;
		} catch (error) {
			throw new Error('Error getting equipment');
		}
	}

	public validateCreateEquipment(req: AuthenticatedRequest): ValidateCreateEquipmentResponse {
		if (!req.body) {
			return { valid: false, error: 'Missing request body' };
		}

		const { name, serialNumber } = req.body;

		if (!name) {
			return { valid: false, error: 'Missing name' };
		}

		if (!serialNumber) {
			return { valid: false, error: 'Missing serial number' };
		}

		return { valid: true };
	}

	public async createEquipment(
		name: string,
		serialNumber: string,
		accountId: string,
		description?: string,
	): Promise<Equipment> {
		try {
			const db = await Db.getClient();

			const equipmentCollection = db.collections.get('Equipment');

			const uuid = await equipmentCollection.data.insert({
				properties: {
					name,
					serialNumber,
					description: description || '',
				},
				references: {
					accountId,
				},
			});

			return {
				id: uuid,
				name,
				serialNumber,
				description,
			} as Equipment;
		} catch (error) {
			throw new Error('Error creating equipment');
		}
	}
}
