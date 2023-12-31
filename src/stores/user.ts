import { acceptHMRUpdate, defineStore } from 'pinia';
import { IUser } from '@/models/user.model.ts';

export const useUserStore = defineStore('user', {
	state: (): IUser => {
		return {
			userId: 'c3'
		}
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

export type UserStore = ReturnType<typeof useUserStore>;
