import bcrypt from 'bcrypt';
import { Request } from 'express';
import Db from '../../core/db/db';
import { signToken } from '../../core/utils/jwt';
import { User } from '../user/user.type';
import { SignInParams, ValidateSignInResponse } from './auth.type';

export class AuthService {
	public validateSignInRequest(req: Request): ValidateSignInResponse {
		if (!req.body) {
			return { valid: false, error: 'Missing request body' };
		}

		const { email, password } = req.body;

		if (!email) {
			return { valid: false, error: 'Missing email' };
		}

		if (!password) {
			return { valid: false, error: 'Missing password' };
		}

		return { valid: true };
	}

	public async signIn(params: SignInParams): Promise<string> {
		try {
			const db = await Db.getClient();

			const userCollection = db.collections.get('User');

			const { objects } = await userCollection.query.fetchObjects({
				limit: 1,
				filters: userCollection.filter.byProperty('email').equal(params.email),
			});

			console.log(objects);

			if (!objects.length) {
				throw new Error('User not found');
			}

			const { properties, uuid, references } = objects[0];

			const user = {
				id: uuid,
				...properties,
				accountId: references?.[0].objects?.[0].uuid,
			} as User;

			const isPasswordValid = await bcrypt.compare(
				params.password,
				user.password,
			);

			if (!isPasswordValid) {
				throw new Error('Invalid password');
			}

			Reflect.deleteProperty(user, 'password');

			return signToken(user);
		} catch (error: any) {
			throw new Error(`Error signing in: ${error.message}`);
		}
	}
}
