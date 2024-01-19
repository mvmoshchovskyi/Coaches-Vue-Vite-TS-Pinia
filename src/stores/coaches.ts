import { defineStore, acceptHMRUpdate } from 'pinia';
import { ICoaches, ICoach } from '@/models/coaches.models.ts';
import { useAuthStore } from '@/stores/auth.ts';
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
			const {userId} = useAuthStore();
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
			const { data, error } = await useFetch(`${url}/coaches.json`);
			const coaches = [];

			if (error) {
				this.error = error.value;
			}

			if (data) {
				for (const key in data.value) {
					const coach = {
						id: key,
						firstName: data.value[key].firstName,
						lastName: data.value[key].lastName,
						description: data.value[key].description,
						hourlyRate: data.value[key].hourlyRate,
						areas: data.value[key].areas,
					} as ICoach;

					coaches.push(coach);
				}

				this.coaches = coaches;
			}

		},

		async registerCoaches(newCoach: ICoach) {
			const authStore = useAuthStore();
			const { data, error } = await useFetch(`${url}/coaches/${newCoach.id}.json?auth=${authStore.token}`, {
				method: 'PUT',
				data: newCoach,
			});

			if (error) {
				this.error = error.value;
			}

			if (data) {
				this.registerCoach({...data.value});
			}
		}
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export type CoachStore = ReturnType<typeof useCoachStore>;
