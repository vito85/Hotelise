import { CHANNEL_NAMES } from "./channels";
import { RESERVATION_STATUSES } from "./reservations";

export enum DateFilterOptionValue {
	CUSTOM,
	PREDEFINED,
}

export interface DateFilterOption {
	label: string;
	value: DateFilterOptionValue;
}

export enum DateFilterType {
	CHECKIN_TIME = "checkin_time",
	CHECKOUT_TIME = "checkout_time",
}

export interface DateRangeFilter {
	dateFrom: null | string;
	dateTo: null | string;
	dateFromType: DateFilterType;
	dateToType: DateFilterType;
}

export interface DateRangeFilterWithType extends DateRangeFilter {
	dateFromType: DateFilterType;
	dateToType: DateFilterType;
}

export interface StatementsFilter {
	year: number;
	month: number;
}

export enum ComplexFilterType {
	SEARCH = "search",
	PROPERTY_ID = "propertyId",
	STATUS = "status",
	CHANNEL = "channel",
	DATE = "date",
	CITY = "city",
}

export interface ReservationsChannelComplexFilter {
	type: ComplexFilterType.CHANNEL;
	value: CHANNEL_NAMES | null;
	title?: string;
}

export interface ReservationsStatusComplexFilter {
	type: ComplexFilterType.STATUS;
	value: RESERVATION_STATUSES | null;
	title?: string;
}

export interface SearchComplexFilter {
	type: ComplexFilterType.SEARCH;
	value: string | null;
	title?: string;
}

export interface DateComplexFilter {
	type: ComplexFilterType.DATE;
	value: DateRangeFilter | null;
	title?: string;
}

export interface PropertyIdComplexFilter {
	type: ComplexFilterType.PROPERTY_ID;
	value: string | null;
	title?: string;
}

export interface PropertyIdsComplexFilter {
	type: ComplexFilterType.PROPERTY_ID;
	value: string[] | null;
	title?: string;
}

export interface CityComplexFilter {
	type: ComplexFilterType.CITY;
	value: string | null;
	title?: string;
}

export type ComplexFilterItem =
	| ReservationsChannelComplexFilter
	| ReservationsStatusComplexFilter
	| SearchComplexFilter
	| DateComplexFilter
	| PropertyIdComplexFilter
	| PropertyIdsComplexFilter
	| CityComplexFilter;
