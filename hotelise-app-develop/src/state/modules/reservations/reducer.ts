import produce from "immer";
import { ComplexFilterType } from "interfaces/filters";
import {
	ReservationsState,
	ReservationsAction,
	ReservationsActionTypes,
} from "state/modules/reservations/types";
import { defaultCalendarRange } from "utils/calendar";
import { defaultReservationsDateFilter } from "utils/reservations";

const initialState: ReservationsState = {
	isLoading: false,
	reservationsFilter: [
		{
			type: ComplexFilterType.DATE,
			value: {
				...defaultReservationsDateFilter,
			},
		},
	],
	reservations: [],
	reservationsCalendarItems: [],
	reservationsCalendarRange: defaultCalendarRange,
	report: null,
};

const reservationsReducer = (
	state = initialState,
	action: ReservationsAction
): ReservationsState =>
	produce(state, (draft: ReservationsState) => {
		switch (action.type) {
			case ReservationsActionTypes.SET_RESERVATIONS:
				draft.reservations = action.payload;
				draft.isLoading = false;

				return;
			case ReservationsActionTypes.SET_RESERVATIONS_CALENDAR_ITEMS:
				draft.reservationsCalendarItems = action.payload;
				draft.isLoading = false;

				return;
			case ReservationsActionTypes.GET_RESERVATIONS_FAIL:
				draft.isLoading = false;

				return;
			case ReservationsActionTypes.GET_RESERVATIONS_START:
				draft.isLoading = true;

				return;
			case ReservationsActionTypes.SET_RESERVATIONS_FILTER:
				draft.reservationsFilter = action.payload;

				return;
			case ReservationsActionTypes.SET_RESERVATIONS_CALENDAR_RANGE:
				draft.reservationsCalendarRange = action.payload;

				return;
			case ReservationsActionTypes.SET_RESERVATIONS_REPORT:
				draft.report = action.payload;

				return;
			default:
				return state;
		}
	});

export default reservationsReducer;
