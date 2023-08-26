import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";

import {
	ComplexFilterItem,
	ComplexFilterType,
	DateComplexFilter,
	PropertyIdsComplexFilter,
} from "interfaces/filters";

import { Property } from "models/properties";

import * as dashboardActions from "state/modules/dashboard/actions";

import PropertiesClient from "services/api/properties";
import ReportsClient from "services/api/reports";

import {
	getDashboardFilter,
	getDashboardSelectedYear,
	DashboardActionTypes,
} from "state/modules/dashboard";
import { defaultReportDateFilter } from "utils/report";

function compileProperties(propertyFilter: PropertyIdsComplexFilter): string {
	if (
		propertyFilter?.value &&
		propertyFilter.value.filter(Boolean).length > 0
	) {
		const nonEmptyValues = propertyFilter.value.filter(Boolean);
		return nonEmptyValues.join(",");
	}
	return "";
}
export function* handleGetDashboardReport(): Generator {
	yield put(dashboardActions.getDashboardReportStart());
	const filter = (yield select(getDashboardFilter)) as ComplexFilterItem[];

	try {
		const propertiesRes = (yield call(PropertiesClient.getProperties, {
			offset: 0,
			city: "",
			name: "",
			fields: "id,name",
		})) as AxiosResponse;

		const properties = propertiesRes.data.content as Property[];
		const propertyIds = properties.map((item) => item.id);
		const propertyIdsString = propertyIds.join(",");

		const dateFilter = filter.find(
			(item) => item.type === ComplexFilterType.DATE
		) as DateComplexFilter;

		const propertyFilter = filter.find(
			(item) => item.type === ComplexFilterType.PROPERTY_ID
		) as PropertyIdsComplexFilter;

		const fieldsToGetBack = [
			"calculations.totalExpensesPerCurrency",
			"calculations.totalCleaningPerCurrency",
			"calculations.totalHoteliseFeePerCurrency",
			"calculations.totalInCurrency",
			"calculations.occupancyRate",
			"calculations.alos",
			"calculations.reservationPeriod",
			"calculations.totalIncomePerCurrency",
		];
		const res = (yield call(ReportsClient.generateReport, {
			propertyIds: compileProperties(propertyFilter) || propertyIdsString,
			dateFrom: dateFilter?.value?.dateFrom || defaultReportDateFilter.dateFrom,
			dateTo: dateFilter?.value?.dateTo || defaultReportDateFilter.dateTo,
			dateFromType:
				dateFilter?.value?.dateFromType || defaultReportDateFilter.dateFromType,
			dateToType:
				dateFilter?.value?.dateToType || defaultReportDateFilter.dateToType,
			fields: fieldsToGetBack.join(","),
		})) as AxiosResponse;

		yield put(dashboardActions.setDashboardReport(res.data.content));
	} catch (error) {
		console.log({ error });
		yield put(dashboardActions.getDashboardReportFail());
	}
}

export function* handleGetDashboardYearReport(): Generator {
	yield put(dashboardActions.getDashboardYearReportStart());

	const year = (yield select(getDashboardSelectedYear)) as number;
	const filter = (yield select(getDashboardFilter)) as ComplexFilterItem[];

	try {
		const propertiesRes = (yield call(PropertiesClient.getProperties, {
			offset: 0,
			city: "",
			name: "",
			fields: "id,name",
		})) as AxiosResponse;

		const properties = propertiesRes.data.content as Property[];
		const propertyIds = properties.map((item) => item.id);
		const propertyIdsString = propertyIds.join(",");

		const propertyFilter = filter.find(
			(item) => item.type === ComplexFilterType.PROPERTY_ID
		) as PropertyIdsComplexFilter;

		const fieldsToGetBack = [
			"calculations.totalExpensesPerCurrency",
			"calculations.totalCleaningPerCurrency",
			"calculations.totalHoteliseFeePerCurrency",
			"calculations.totalInCurrency",
			"calculations.occupancyRate",
			"calculations.alos",
			"calculations.reservationPeriod",
		];
		const res = (yield call(ReportsClient.getFullYearReport, {
			year,
			propertyIds: compileProperties(propertyFilter) || propertyIdsString,
			fields: fieldsToGetBack.join(","),
		})) as AxiosResponse;

		yield put(dashboardActions.setDashboardYearReport(res.data.content));
	} catch (error) {
		console.log({ error });
		yield put(dashboardActions.getDashboardYearReportFail());
	}
}

export function* dashboardSaga(): Generator {
	yield takeLatest(
		DashboardActionTypes.GET_DASHBOARD_REPORT,
		handleGetDashboardReport
	);
	yield takeLatest(
		DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT,
		handleGetDashboardYearReport
	);
}
