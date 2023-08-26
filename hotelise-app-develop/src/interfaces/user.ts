export interface UserPhone {
	countryCode: string;
	number: string;
}

export interface User {
	cognitoId: string;
	createdAt: string;
	email: string;
	id: string;
	lastName: string;
	name: string;
	phones: UserPhone[];
	status: string;
	updatedAt: string;
}
