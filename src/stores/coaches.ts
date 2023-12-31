import { defineStore, acceptHMRUpdate } from 'pinia';
import { ICoaches, Areas, ICoach } from '@/models/coaches.models.ts';
import { useUserStore } from '@/stores/user.ts';

export const useCoachStore = defineStore('coaches', {
	state: (): ICoaches => {
		return {
			coaches: [
				{
					id: 'c1',
					firstName: 'Misha',
					lastName: 'Mosh',
					areas: [Areas.Frontend, Areas.Backend,],
					description: 'I am very happy',
					hourlyRate: 30,
				},
				{
					id: 'c2',
					firstName: 'Vova',
					lastName: 'Mosh',
					areas: [Areas.Career, Areas.Frontend],
					description: 'I am very success',
					hourlyRate: 40,
				}
			]
		}
	},
	getters: {
		hasCoaches: (state: ICoaches) => state.coaches && state.coaches.length > 0,

		isCoach: (state: ICoaches) => {
			const { userId} = useUserStore();
			return state.coaches.some((coach) => coach.id === userId);
		},

	},
	actions: {
		addCoaches(newCoaches: ICoach) {
			this.coaches.push(newCoaches)
		},

		registerCoaches(data: any) {
			const { userId} = useUserStore();
			const coachData: ICoach = {
				id: userId,
				firstName: data.first,
				lastName: data.last,
				areas: data.areas,
				description: data.desc,
				hourlyRate: data.rate,
			} as ICoach

			this.addCoaches(coachData);
		}
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export type CoachStore = ReturnType<typeof useCoachStore>;
