import { defineStore, acceptHMRUpdate } from 'pinia';
import { ICoaches, ICoach } from '@/models/coaches.models.ts';
import { useUserStore } from '@/stores/user.ts';

const url = import.meta.env.VITE_FIREBASE_HTTP_COACHES;
export const useCoachStore = defineStore('coaches', {
	state: (): ICoaches => {
		return {
			coaches: [],
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

		loadCoaches(responseData: any) {
			const coaches = [];

			for (const key in responseData) {
				const coach = {
					id: key,
					firstName: responseData[key].firstName,
					lastName: responseData[key].lastName,
					description: responseData[key].description,
					hourlyRate: responseData[key].hourlyRate,
					areas: responseData[key].areas,
				} as ICoach;

				coaches.push(coach);
			}

			this.coaches = coaches;
		},

		async registerCoaches(data: any) {
			const {userId} = useUserStore();
			const coachData: ICoach = {
				id: userId,
				firstName: data.first,
				lastName: data.last,
				description: data.desc,
				hourlyRate: data.rate,
				areas: data.areas,
			} as ICoach

			const response = await fetch(`${url}/coaches/${userId}.jso`, {
				method: 'PUT',
				body: JSON.stringify(coachData),
			});

			const responseData = await response.json();

			if (!response.ok) {
				const error = new Error(responseData.message || 'Failed to fetch');
				throw error;
			}

			this.registerCoach({...coachData, id: userId});
		}
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export type CoachStore = ReturnType<typeof useCoachStore>;
