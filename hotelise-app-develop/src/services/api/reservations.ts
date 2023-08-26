import { AxiosResponse } from "axios";
import { build } from "search-params";

import { GetReservationsByPropertyIdReqParams } from "models/properties";
import { GetReservationsReqParams, Reservation } from "models/reservations";

import { DateFilterType } from "interfaces/filters";
import $http from "./instance";

class ReservationsClient {
	public static async getReservations(
		params: GetReservationsReqParams
	): Promise<AxiosResponse> {
		const {
			offset,
			dateRange,
			propertyId,
			search,
			status,
			channel,
			calendarDateRange,
		} = params;

		const queryParams = {
			offset,
			limit: 25,
		} as any;

		if (dateRange) {
			const { dateFrom, dateFromType, dateTo, dateToType } = dateRange;

			if (dateFrom) {
				queryParams[`${dateFromType}[gte]`] = dateFrom;
			}

			if (dateTo) {
				queryParams[`${dateToType}[lte]`] = dateTo;
			}
		}

		if (calendarDateRange) {
			queryParams[`calendar_${DateFilterType.CHECKOUT_TIME}[gte]`] =
				calendarDateRange.dateFrom;
			queryParams[`calendar_${DateFilterType.CHECKOUT_TIME}[lte]`] =
				calendarDateRange.dateTo;
		}

		if (propertyId) {
			queryParams.propertyId = propertyId;
		}
		if (search) {
			queryParams.search = search;
		}
		if (status) {
			queryParams.status = status;
		}
		if (channel) {
			queryParams.channel = channel;
		}

		const query = build({
			...queryParams,
		});

		return $http.get(`/reservations?${query}`);
	}

	public static async getReservationsByPropertyId(
		params: GetReservationsByPropertyIdReqParams
	): Promise<AxiosResponse> {
		const { id, offset, dateFrom, dateTo, dateFromType, dateToType } = params;

		const queryParams = {
			offset,
			limit: 25,
		} as any;

		if (dateFrom) {
			queryParams[`${dateFromType}[gte]`] = dateFrom;
		}

		if (dateTo) {
			queryParams[`${dateToType}[lte]`] = dateTo;
		}

		const query = build({
			...queryParams,
		});

		return $http.get(`/reservations/${id}?${query}`);
	}

	public static async updateReservationsById(
		reservation: Reservation
	): Promise<AxiosResponse> {
		return $http.put(`/reservations/${reservation.id}`, reservation);
	}
}

export default ReservationsClient;
