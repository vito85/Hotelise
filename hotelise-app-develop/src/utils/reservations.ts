import dayjs from "dayjs";
import { DateRangeFilter, DateFilterType } from "interfaces/filters";
import {
	ReservationsTabValue,
	ReservationStatusSelectOption,
	RESERVATION_STATUSES,
	ReservationsTab,
} from "interfaces/reservations";

export const reservationStatusesList = [
	{
		label: "Accepted",
		value: RESERVATION_STATUSES.ACCEPTED,
	},
	{
		label: "Cancelled",
		value: RESERVATION_STATUSES.CANCELLED,
	},
	{
		label: "Pending",
		value: RESERVATION_STATUSES.PENDING,
	},
] as ReservationStatusSelectOption[];

export const defaultReservationsDateFilter = {
	dateFrom: dayjs().startOf("month").toISOString(),
	dateTo: dayjs().endOf("month").toISOString(),
	dateFromType: DateFilterType.CHECKOUT_TIME,
	dateToType: DateFilterType.CHECKOUT_TIME,
} as DateRangeFilter;

export const reservationsPageTabs = [
	{
		title: "Table",
		value: ReservationsTabValue.TABLE,
	},
	{
		title: "Calendar",
		value: ReservationsTabValue.CALENDAR,
	},
] as Array<ReservationsTab>;
