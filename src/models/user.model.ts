export interface IAuth {
	userId: string | null;
	token: string | null;
	tokenExpiration: string | null;
	error: string | null;
	isLoading: boolean;
}

export interface IUser {
	email: string,
	password: string,
	returnSecureToken: boolean,
}
