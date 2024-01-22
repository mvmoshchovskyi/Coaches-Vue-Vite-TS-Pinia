import { acceptHMRUpdate, defineStore } from 'pinia';
import { IAuth, IUser } from '@/models/user.model.ts';
import { useFetch } from '@/hooks/useFetch.ts';

const WEB_API_KEY = import.meta.env.VITE_WEB_API_KEY;
const HTTP_AUTH = import.meta.env.VITE_FIREBASE_HTTP_AUTH;

let timer: number;

export const useAuthStore = defineStore('auth', {
	state: (): IAuth => {
		return {
			userId: null,
			token: null,
			error: null,
			isLoading: false,
			didAutoLogout: false,
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

			const url = `${HTTP_AUTH}:${action}?key=${WEB_API_KEY}`;

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

			if (data.value) {
				const expiresIn = +data.value.expiresIn * 1000;
				const expirationDate = (new Date().getTime() + expiresIn).toString();

				timer = setTimeout(() => {
					this.autoLogout();
				}, expiresIn);

				localStorage.setItem('token', data.value.idToken);
				localStorage.setItem('userId', data.value.localId);
				localStorage.setItem('tokenExpiration', expirationDate);

				this.token = data.value.idToken;
				this.userId = data.value.localId;
				this.didAutoLogout = false;
			}
		},

		tryLogin() {
			const token = localStorage.getItem('token');
			const userId = localStorage.getItem('userId');
			const tokenExpiration = localStorage.getItem('tokenExpiration');

			const expiresIn = tokenExpiration ? (+tokenExpiration - new Date().getTime()) : 0;

			if (expiresIn <= 0) {
				return;
			}

			timer = setTimeout(() => {
				this.autoLogout();
			}, expiresIn)

			if (token && userId) {
				this.token = token;
				this.userId = userId;
				this.didAutoLogout = false;
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
			localStorage.removeItem('tokenExpiration');

			clearTimeout(timer);

			this.$reset();
		},

		autoLogout() {
			this.logout();
			this.didAutoLogout = true;
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export type UserStore = ReturnType<typeof useAuthStore>;
