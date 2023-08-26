export enum ClaimsStatuses {
	ACTIVE = "ACTIVE",
	DISABLED = "DISABLED",
}

export interface Claim {
	id?: string;
	name?: string;
	description?: string;
	amount?: number;
	currency?: string;
	date?: string;
	propertyId?: string;
	status?: ClaimsStatuses;
}

export interface GetClaimsReqParams {
	offset: number;
	dateFrom: string | null;
	dateTo: string | null;
	limit?: number;
	propertyId?: string;
}
