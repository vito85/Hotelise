import { Property } from "models/properties";
import { ReportTableItemWithTransfer } from "./reports";

export enum RESERVATION_STATUSES {
	ACCEPTED = "accepted",
	CANCELLED = "cancelled",
	PENDING = "pending",
}

export interface ReservationStatusSelectOption {
	label: string;
	value: RESERVATION_STATUSES;
}

export enum ReservationsTabValue {
	TABLE,
	CALENDAR,
}

export interface ReservationsTab {
	value: ReservationsTabValue;
	title: string;
}

export interface ReportReservation extends ReportTableItemWithTransfer {
	property: Property;
}
