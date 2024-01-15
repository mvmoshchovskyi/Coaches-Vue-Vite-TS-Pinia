import { acceptHMRUpdate, defineStore } from 'pinia';
import { IRequest, IRequests } from '@/models/requests.model.ts';
import { useUserStore } from '@/stores/user.ts';
import { useFetch } from '@/hooks/useFetch.ts';

const url = import.meta.env.VITE_FIREBASE_HTTP_COACHES;

export const useRequestsStore = defineStore('requests', {
	state: (): IRequests => {
		return {
			requests: [],
			error: null,
		}
	},
	getters: {
		filteredRequests(state) {
			const {userId} = useUserStore();
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

		setRequests(request: IRequest) {
			this.requests = request;
		},

		handleError() {
			this.error = null;
		},

		async contactCoach(payload: any) {
			const newRequest = {
				userEmail: payload.email,
				message: payload.message
			} as IRequest;

			const { data, error} = await useFetch(`${url}/requests/${payload.coachId}.json`, {
				method: 'POST',
				data: newRequest,
			});

			if (error) {
				this.error = error.value;
			}

			if (data) {
				newRequest.id = data.value?.name;
				newRequest.coachId = payload.coachId;
				this.addRequests(newRequest);
			}
		},

		async fetchRequests() {

			const coachId = useUserStore().userId;
			const {data, error} = await useFetch(`${url}/requests/${coachId}.json`);

			if (error) {
				this.error = error.value;
			}

			const requests = [];

			for (const key in data.value) {
				const request = {
					id: key,
					coachId: coachId,
					userEmail: data.value[key].userEmail,
					message: data.value[key].message
				};
				requests.push(request);
			}

			this.setRequests(requests)
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRequestsStore, import.meta.hot));
}

export type RequestsStore = ReturnType<typeof useRequestsStore>;
