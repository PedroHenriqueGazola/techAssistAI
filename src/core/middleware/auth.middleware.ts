import { NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';
import { AuthenticatedRequest, authenticatedUser } from './auth.type';

export const AuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization;

	if (!token) {
		res.status(401).json({ error: 'Token is required' });

		return;
	}

	const [type, tokenValue] = token.split(' ');

	if (type !== 'Bearer') {
		res.status(401).json({ error: 'Invalid token type' });

		return;
	}

	try {
		const token = verifyToken(tokenValue);

		if (!(token as JwtPayload)?.accountId || !(token as JwtPayload)?.id) {
			res.status(401).json({ error: 'Invalid token missing fields' });

			return;
		}

		req.authenticatedUser = token as authenticatedUser;

		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
	}
};
