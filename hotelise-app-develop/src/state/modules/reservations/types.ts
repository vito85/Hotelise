import { CalendarRange, CalendarDatesObject } from "interfaces/calendar";
import { ComplexFilterItem } from "interfaces/filters";
import {
	ReportTableItemWithTransfer,
	PropertyReport,
} from "interfaces/reports";

import { Reservation } from "models/reservations";

export interface ReservationsState {
	isLoading: boolean;
	reservationsFilter: ComplexFilterItem[];
	reservations: ReportTableItemWithTransfer[];
	reservationsCalendarItems: ReportTableItemWithTransfer[];
	reservationsCalendarRange: CalendarRange;
	report: PropertyReport | null;
}

export enum ReservationsActionTypes {
	GET_RESERVATIONS = "@@reservation/GET_RESERVATIONS",
	GET_RESERVATIONS_START = "@@reservation/GET_RESERVATIONS_START",
	GET_RESERVATIONS_FAIL = "@@reservation/GET_RESERVATIONS_FAIL",

	SET_RESERVATIONS_REPORT = "@@reservation/SET_RESERVATIONS_REPORT",
	SET_RESERVATIONS = "@@reservation/SET_RESERVATIONS",
	SET_RESERVATIONS_FILTER = "@@reservation/SET_RESERVATIONS_FILTER",

	SET_RESERVATIONS_CALENDAR_RANGE = "@@reservation/SET_RESERVATIONS_CALENDAR_RANGE",
	SET_RESERVATIONS_CALENDAR_ITEMS = "@@reservation/SET_RESERVATIONS_CALENDAR_ITEMS",
}

export interface SetReservationsActionPayload {
	reservationsList: Reservation[];
	reservationsTotal: number;
	reservationsCalendarItems: CalendarDatesObject[];
}

export interface GetReservationsAction {
	type: ReservationsActionTypes.GET_RESERVATIONS;
}

export interface GetReservationsStartAction {
	type: ReservationsActionTypes.GET_RESERVATIONS_START;
}

export interface GetReservationsFailAction {
	type: ReservationsActionTypes.GET_RESERVATIONS_FAIL;
}

export interface SetReservationsCalendarItemsAction {
	type: ReservationsActionTypes.SET_RESERVATIONS_CALENDAR_ITEMS;
	payload: ReportTableItemWithTransfer[];
}

export interface SetReservationsAction {
	type: ReservationsActionTypes.SET_RESERVATIONS;
	payload: ReportTableItemWithTransfer[];
}

export interface SetReservationsFilterAction {
	type: ReservationsActionTypes.SET_RESERVATIONS_FILTER;
	payload: ComplexFilterItem[];
}

export interface SetReservationsCalendarRangeAction {
	type: ReservationsActionTypes.SET_RESERVATIONS_CALENDAR_RANGE;
	payload: CalendarRange;
}

export interface SetReservationsReportAction {
	type: ReservationsActionTypes.SET_RESERVATIONS_REPORT;
	payload: PropertyReport;
}

export type ReservationsAction =
	| GetReservationsAction
	| GetReservationsStartAction
	| GetReservationsFailAction
	| SetReservationsAction
	| SetReservationsFilterAction
	| SetReservationsCalendarRangeAction
	| SetReservationsCalendarItemsAction
	| SetReservationsReportAction;
