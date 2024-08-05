export interface AuthenticatedUser {
	accountId: string;
	userId: string;
	name: string;
	email: string;
}

export interface ValidateSignInResponse {
	valid: boolean;
	error?: string;
}

export interface SignInParams {
	email: string;
	password: string;
}
