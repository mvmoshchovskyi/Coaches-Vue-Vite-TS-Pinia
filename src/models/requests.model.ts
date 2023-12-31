export interface IRequest {
	id: string,
	coachId: string,
	userEmail: string,
	message: string,
}

export interface IRequests {
	requests: IRequest[],
}

