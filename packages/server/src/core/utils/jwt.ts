import 'dotenv/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const signToken = (payload: any): string => {
	if (!secret) {
		throw new Error('JWT_SECRET is not defined');
	}

	return sign(payload, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): JwtPayload | string => {
	if (!secret) {
		throw new Error('JWT_SECRET is not defined');
	}

	return verify(token, secret);
};
