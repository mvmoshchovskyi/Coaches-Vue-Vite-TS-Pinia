import { acceptHMRUpdate, defineStore } from 'pinia';
import { IRequest, IRequests } from '@/models/requests.model.ts';
import { useUserStore } from '@/stores/user.ts';

export const useRequestsStore = defineStore('requests', {
	state: (): IRequests => {
		return {
			requests: [],
		}
	},
	getters: {
		filteredRequests(state) {
			const { userId} = useUserStore();
			return state.requests.filter(req => req.coachId === userId);
		},

		hasRequests() {
			return this.filteredRequests && this.filteredRequests.length > 0;
		},

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
