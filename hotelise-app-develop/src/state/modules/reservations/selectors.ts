import { createSelector } from "reselect";
import { State } from "state/modules";

import { ReservationsState } from "./types";

export const getReservationsState = (state: State): ReservationsState =>
	state.reservations;

export const getReservationsList = createSelector(
	getReservationsState,
	(state) => state.reservations
);

export const getReservationsLoading = createSelector(
	getReservationsState,
	(state) => state.isLoading
);

export const getReservationsFilter = createSelector(
	getReservationsState,
	(state) => state.reservationsFilter
);

export const getReservationsCalendarDateRange = createSelector(
	getReservationsState,
	(state) => state.reservationsCalendarRange
);

export const getReservationsCalendarItems = createSelector(
	getReservationsState,
	(state) => state.reservationsCalendarItems
);

export const getReservationsReport = createSelector(
	getReservationsState,
	(state) => state.report
);
