import { acceptHMRUpdate, defineStore } from 'pinia';
import { IRequest, IRequests } from '@/models/requests.model.ts';

export const useRequestsStore = defineStore('requests', {
	state: (): IRequests => {
		return {
			requests: [],
		}
	},
	getters: {
		hasRequests(state) {
			return state.requests && state.requests.length > 0;
		}
	},
	actions: {
		addRequests(request: IRequest) {
			this.requests.push(request);
		},

		contactCoach(payload: any) {
			const newRequest = {
				id: new Date().toISOString(),
				coachId: payload.coachId,
				userEmail: payload.email,
				message: payload.message,
			} as IRequest

			this.addRequests(newRequest);
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRequestsStore, import.meta.hot));
}

export type RequestsStore = ReturnType<typeof useRequestsStore>;
