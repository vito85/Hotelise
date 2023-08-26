import { CalendarRange } from "interfaces/calendar";
import { ComplexFilterItem } from "interfaces/filters";
import {
	ReportTableItemWithTransfer,
	PropertyReport,
} from "interfaces/reports";
import {
	GetReservationsAction,
	GetReservationsStartAction,
	ReservationsActionTypes,
	SetReservationsAction,
	GetReservationsFailAction,
	SetReservationsFilterAction,
	SetReservationsCalendarRangeAction,
	SetReservationsReportAction,
	SetReservationsCalendarItemsAction,
} from "./types";

export function getReservations(): GetReservationsAction {
	return {
		type: ReservationsActionTypes.GET_RESERVATIONS,
	};
}

export function getReservationsStart(): GetReservationsStartAction {
	return {
		type: ReservationsActionTypes.GET_RESERVATIONS_START,
	};
}

export function getReservationsFail(): GetReservationsFailAction {
	return {
		type: ReservationsActionTypes.GET_RESERVATIONS_FAIL,
	};
}

export function setReservations(
	payload: ReportTableItemWithTransfer[]
): SetReservationsAction {
	return {
		type: ReservationsActionTypes.SET_RESERVATIONS,
		payload,
	};
}

export function setReservationsFilter(
	payload: ComplexFilterItem[]
): SetReservationsFilterAction {
	return {
		type: ReservationsActionTypes.SET_RESERVATIONS_FILTER,
		payload,
	};
}

export function setReservationsCalendarRange(
	payload: CalendarRange
): SetReservationsCalendarRangeAction {
	return {
		type: ReservationsActionTypes.SET_RESERVATIONS_CALENDAR_RANGE,
		payload,
	};
}

export function setReservationsCalendarItems(
	payload: ReportTableItemWithTransfer[]
): SetReservationsCalendarItemsAction {
	return {
		type: ReservationsActionTypes.SET_RESERVATIONS_CALENDAR_ITEMS,
		payload,
	};
}

export function setReservationsReport(
	payload: PropertyReport
): SetReservationsReportAction {
	return {
		type: ReservationsActionTypes.SET_RESERVATIONS_REPORT,
		payload,
	};
}
