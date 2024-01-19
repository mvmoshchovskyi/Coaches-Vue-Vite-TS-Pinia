export interface IRequest {
	id: string,
	coachId: string | null,
	userEmail: string,
	message: string,
}

export interface IRequests {
	requests: IRequest[],
	error: null,
}

