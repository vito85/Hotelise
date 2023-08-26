import { call, put, select, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import * as reservationsActions from "state/modules/reservations/actions";
import {
	DateComplexFilter,
	ComplexFilterItem,
	ComplexFilterType,
	PropertyIdComplexFilter,
} from "interfaces/filters";

import { Property } from "models/properties";
import PropertiesClient from "services/api/properties";
import { GenerateReportResponse } from "models/reports";
import ReportsClient from "services/api/reports";
import { defaultReservationsDateFilter } from "utils/reservations";
import { ReservationsActionTypes } from "./types";
import { getReservationsFilter } from "./selectors";

export function* handleGetReservations(): Generator {
	yield put(reservationsActions.getReservationsStart());

	const filters = (yield select(
		getReservationsFilter
	)) as Array<ComplexFilterItem>;

	try {
		const res = (yield call(PropertiesClient.getProperties, {
			offset: 0,
			city: "",
			name: "",
		})) as AxiosResponse;

		const properties = res.data.content as Property[];

		if (properties.length) {
			const propertyIds = properties.map((item) => item.id);
			const propertyIdsString = propertyIds.join(",");
			const propertyFilter = filters.find(
				(item) => item.type === ComplexFilterType.PROPERTY_ID
			) as PropertyIdComplexFilter;

			const propertiesMap = {} as {
				[n: string]: Property;
			};

			properties.forEach((property) => {
				propertiesMap[property.id] = property;
			});

			const dateFilter = (filters.find(
				(filter) => filter.type === ComplexFilterType.DATE
			) || defaultReservationsDateFilter) as DateComplexFilter;

			const reportsRes = (yield call(ReportsClient.generateReport, {
				propertyIds: propertyFilter?.value || propertyIdsString,
				dateFrom:
					dateFilter?.value?.dateFrom || defaultReservationsDateFilter.dateFrom,
				dateTo:
					dateFilter?.value?.dateTo || defaultReservationsDateFilter.dateTo,
				dateFromType:
					dateFilter?.value?.dateFromType ||
					defaultReservationsDateFilter.dateFromType,
				dateToType:
					dateFilter?.value?.dateToType ||
					defaultReservationsDateFilter.dateToType,
			})) as AxiosResponse<GenerateReportResponse>;

			const report = reportsRes.data.content;

			const transformedReservations =
				report.calculations.allAccountTransfers.map((item) => ({
					...item,
					property: propertiesMap[item._item.propertyId] || "",
				}));

			yield put(reservationsActions.setReservations(transformedReservations));
			yield put(reservationsActions.setReservationsReport(report));
		}
	} catch (error) {
		console.log({ error });
		yield put(reservationsActions.getReservationsFail());
	}
}

export function* reservationsSaga(): Generator {
	yield takeLatest(
		ReservationsActionTypes.GET_RESERVATIONS,
		handleGetReservations
	);
}
