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
		async auth(payload: any) {
			const action = payload.mode === 'signup' ? 'signUp' : 'signInWithPassword';

			const url = `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${WEB_API_KEY}`;

			const user = {
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			};

			const {data, error, isLoading} = await useFetch(url, {
				method: 'post',
				data: user,
			});

			if (isLoading.value) {
				this.isLoading = isLoading.value;
			}

			if (error.value) {
				this.error = error.value;
			}

			localStorage.setItem('token', data.value.idToken);
			localStorage.setItem('userId', data.value.localId);

			if (data.value) {
				this.token = data.value.idToken;
				this.userId = data.value.localId;
				this.tokenExpiration = data.value.expiresIn;
			}
		},

		tryLogin() {
			const token = localStorage.getItem('token');
			const userId = localStorage.getItem('userId');

			if (token && userId) {
				this.token = token;
				this.userId = userId;
				this.tokenExpiration = null;
			}

		},

		async signup(payload: Partial<IUser>) {
			return this.auth({...payload, mode: 'signup'})
		},


		async login(payload: Partial<IUser>) {
			return this.auth({...payload, mode: 'login'});
		},

		logout() {
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			this.$reset();
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export type UserStore = ReturnType<typeof useAuthStore>;
