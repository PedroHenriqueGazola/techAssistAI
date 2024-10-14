import { Request } from 'express';
import { User } from '../../modules/user/user.type';

export type authenticatedUser = User & { token: string };

export type AuthenticatedRequest = Request & {
	authenticatedUser?: authenticatedUser;
};
