export interface IAuth {
	userId: string | null;
	token: string | null;
	error: string | null;
	isLoading: boolean;
	didAutoLogout: boolean;
}

export interface IUser {
	email: string,
	password: string,
	returnSecureToken: boolean,
}
