import { defineStore, acceptHMRUpdate } from 'pinia';
import { ICoaches, Areas } from '@/models/coaches.models.ts';

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
					areas: [Areas.PM, Areas.FullStack],
					description: 'I am very success',
					hourlyRate: 40,
				}
			]
		}
	},
	getters: {
		hasCoaches: (state: ICoaches) => state.coaches && state.coaches.length > 0,
	},
	actions: {
		increment() {
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export type CoachStore = ReturnType<typeof useCoachStore>;
