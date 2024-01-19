import { acceptHMRUpdate, defineStore } from 'pinia';
import { IAuth, IUser } from '@/models/user.model.ts';
import { useFetch } from '@/hooks/useFetch.ts';

const WEB_API_KEY = import.meta.env.VITE_WEB_API_KEY;

export const useAuthStore = defineStore('auth', {
	state: (): IAuth => {
		return {
			userId: null,
			token: null,
			tokenExpiration: null,
			error: null,
			isLoading: false,
		}
	},

	getters: {
		isAuthenticated(): boolean {
			return !!this.token
		},
	},

	actions: {
		async signup(payload: Partial<IUser>) {
			const newUser = {
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			}
			const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`;
			const { data, error, isLoading } = await useFetch(url, {
				method: 'post',
				data: newUser,
			});

			if (isLoading.value) {
				this.isLoading = isLoading.value;
			}

			if (error.value) {
				this.error = error.value;
			}

			if (data.value) {
				this.token = data.value.idToken;
				this.userId = data.value.localId;
				this.tokenExpiration = data.value.expiresIn;
			}
		},


		async login(payload: Partial<IUser>) {
			const newUser = {
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			}
			const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`;
			const { data, error, isLoading } = await useFetch(url, {
				method: 'post',
				data: newUser,
			});

			if (isLoading.value) {
				this.isLoading = isLoading.value;
			}

			if (error.value) {
				this.error = error.value;
			}

			if (data.value) {
				this.token = data.value.idToken;
				this.userId = data.value.localId;
				this.tokenExpiration = data.value.expiresIn;
			}
		},

		logout() {
			this.$reset();
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export type UserStore = ReturnType<typeof useAuthStore>;
