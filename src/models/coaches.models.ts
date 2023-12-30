export enum Areas {
	Frontend,
	Backend,
	FullStack,
	PM
}

export interface ICoach {
	id: string;
	firstName: string;
	lastName: string;
	areas: Areas[],
	description: string;
	hourlyRate: number,
}

export interface ICoaches {
	coaches: ICoach[]
}
