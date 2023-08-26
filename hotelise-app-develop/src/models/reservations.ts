import { CalendarDatesObject, CalendarRange } from "interfaces/calendar";
import { CHANNEL_NAMES } from "interfaces/channels";
import { DateRangeFilter } from "interfaces/filters";
import { RESERVATION_STATUSES } from "interfaces/reservations";

export interface ReservationGuest {
	id: number;
	first_name: string;
	last_name: string;
	picture_url: string;
	location: string;
	phone: string;
	email: string;
}

export interface ReservationListing {
	id: number;
	property_id: number;
	name: string;
	nickname: string;
	address: string;
	picture_url: string;
	lat: number;
	lng: number;
}

export interface Reservation {
	id: string;
	user_id: string;
	code: string;
	channel: string;
	start_date: string;
	end_date: string;
	checkin_time: string;
	checkout_time: string;
	nights: number;
	guests: number;
	adults: number;
	children: number;
	infants: number;
	status: string;
	guest: ReservationGuest;
	listing: ReservationListing;
	currency: string;
	security_price: number;
	security_price_formatted: string;
	per_night_price: number;
	per_night_price_formatted: string;
	base_price: number;
	base_price_formatted: string;
	extras_price: number;
	extras_price_formatted: string;
	subtotal: number;
	subtotal_formatted: string;
	tax_amount: number;
	tax_amount_formatted: string;
	guest_fee: number;
	guest_fee_formatted: string;
	total_price: number;
	total_price_formatted: string;
	host_service_fee: number;
	host_service_fee_formatted: string;
	payout_price: number;
	payout_price_formatted: string;
	created_at: number;
	updated_at: number;
	sent_at: number;
}

export interface GetReservationsResponse {
	content: {
		reservations: Reservation[];
		calendarAndChartData: CalendarDatesObject[];
	};
	_metadata: {
		totalCount: number;
	};
}

export interface GetReservationsReqParams {
	offset: number;
	dateRange?: DateRangeFilter;
	propertyId?: string;
	search?: string;
	status?: RESERVATION_STATUSES;
	channel?: CHANNEL_NAMES;
	calendarDateRange: CalendarRange;
}
