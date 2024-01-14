import { defineStore, acceptHMRUpdate } from 'pinia';
import { ICoaches, ICoach } from '@/models/coaches.models.ts';
import { useUserStore } from '@/stores/user.ts';
import { useFetch } from '@/hooks/useFetch.ts';

const url = import.meta.env.VITE_FIREBASE_HTTP_COACHES;
export const useCoachStore = defineStore('coaches', {
	state: (): ICoaches => {
		return {
			coaches: [],
			error: null,
		}
	},
	getters: {
		hasCoaches: (state: ICoaches) => state.coaches && state.coaches.length > 0,

		isCoach: (state: ICoaches) => {
			const {userId} = useUserStore();
			return state.coaches.some((coach) => coach.id === userId);
		},

	},
	actions: {
		registerCoach(newCoaches: ICoach) {
			this.coaches.push(newCoaches)
		},

		handleError() {
			this.error = null;
		},

		async loadCoaches() {
			const {data, error} = await useFetch(`${url}/coaches.json`);
			const coaches = [];

			if (error) {
				this.error = error;
			}

			if (data) {
				for (const key in data) {
					const coach = {
						id: key,
						firstName: data[key].firstName,
						lastName: data[key].lastName,
						description: data[key].description,
						hourlyRate: data[key].hourlyRate,
						areas: data[key].areas,
					} as ICoach;

					coaches.push(coach);
				}

				this.coaches = coaches;
			}

		},

		async registerCoaches(payload: any) {
			const userStore = useUserStore();
			const coachData: ICoach = {
				id: userStore.userId,
				firstName: payload.first,
				lastName: payload.last,
				description: payload.desc,
				hourlyRate: payload.rate,
				areas: payload.areas,
			} as ICoach

			const {data, error} = await useFetch(`${url}/coaches/${userStore.userId}.json`, {
				method: 'PUT',
				data: coachData,
			});

			if (error) {
				this.error = error;
			}

			if (data) {
				this.registerCoach({...coachData, id: userStore.userId});
			}
		}
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export type CoachStore = ReturnType<typeof useCoachStore>;
