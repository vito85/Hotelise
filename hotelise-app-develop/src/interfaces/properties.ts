export enum PropertyTabValue {
	RESERVATIONS,
	EXPENSES,
	REPORT,
	CONTRACT,
	CLAIMS,
	STATEMENTS,
	DETAILS,
}

export enum PropertyFilterValue {
	CITY = "city",
	Name = "name",
	OWNER_ID = "ownerId",
}

export interface PropertyTab {
	value: PropertyTabValue;
	title: string;
}
