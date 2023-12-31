export enum Areas {
	Frontend ='frontend',
	Backend = 'backend',
	Career = 'career',
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

export interface IFilters {
	[Areas.Career]: boolean;
	[Areas.Frontend]: boolean,
	[Areas.Backend]: boolean,
}
