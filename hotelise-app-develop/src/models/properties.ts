import { DateFilterType } from "interfaces/filters";

export interface PropertyFeatures {
	sync: false;
	heartbeats: true;
	stealth: false;
}

export interface PropertyAddressCoordinates {
	latitude: number;
	longitude: number;
}

export interface PropertyAddress {
	apartment: string;
	street: string;
	city: string;
	state: string;
	country: string;
	postcode: string;
	coordinates: PropertyAddressCoordinates;
	display: string;
}

export interface PropertyOwner {
	owner_id: string;
}

export interface PropertyHotelisePropertyDetailsCategoryField {
	name: string;
	value: string;
	id: string;
}

export interface PropertyHotelisePropertyDetailsCategory {
	id: string;
	name: string;
	fields: PropertyHotelisePropertyDetailsCategoryField[];
}

export interface PropertyHotelisePropertyDetails {
	categories: PropertyHotelisePropertyDetailsCategory[];
}

export interface PropertyHotelise {
	propertyDetails: PropertyHotelisePropertyDetails;
}

export interface Property {
	id: string;
	name: string;
	picture: string;
	currency: string;
	address: PropertyAddress;
	timezone: string;
	listings: 2;
	listed: true;
	features: PropertyFeatures;
	owners?: Array<PropertyOwner>;
	hotelise?: PropertyHotelise;
}

export interface GetReservationsByPropertyIdReqParams {
	id: string;
	offset: number;
	dateFrom: string | null;
	dateTo: string | null;
	dateFromType: DateFilterType;
	dateToType: DateFilterType;
}

export interface GetExpensesByPropertyIdReqParams {
	propertyIds: string;
	offset: number;
	dateFrom: string | null;
	dateTo: string | null;
	limit?: number;
}

export interface GetPropertiesReqParams {
	name?: string;
	city?: string;
	// ownerId?: string;
	offset?: number;
	limit?: number;
	fields?: string;
}
