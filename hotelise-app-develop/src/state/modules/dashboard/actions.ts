import { ComplexFilterItem } from "interfaces/filters";
import { PropertyReport, PropertyYearReport } from "interfaces/reports";
import {
	DashboardActionTypes,
	GetDashboardReportAction,
	GetDashboardReportFailAction,
	GetDashboardReportStartAction,
	GetDashboardYearReportAction,
	GetDashboardYearReportFailAction,
	GetDashboardYearReportStartAction,
	SetDashboardFilterAction,
	SetDashboardReportAction,
	SetDashboardReportYearAction,
	SetDashboardYearReportAction,
} from "./types";

export function getDashboardReport(): GetDashboardReportAction {
	return {
		type: DashboardActionTypes.GET_DASHBOARD_REPORT,
	};
}

export function getDashboardReportStart(): GetDashboardReportStartAction {
	return {
		type: DashboardActionTypes.GET_DASHBOARD_REPORT_START,
	};
}

export function getDashboardReportFail(): GetDashboardReportFailAction {
	return {
		type: DashboardActionTypes.GET_DASHBOARD_REPORT_FAIL,
	};
}

export function setDashboardReport(
	payload: PropertyReport
): SetDashboardReportAction {
	return {
		type: DashboardActionTypes.SET_DASHBOARD_REPORT,
		payload,
	};
}

export function setDashboardFilter(
	payload: ComplexFilterItem[]
): SetDashboardFilterAction {
	return {
		type: DashboardActionTypes.SET_DASHBOARD_FILTER,
		payload,
	};
}

export function setDashboardReportYear(
	payload: number
): SetDashboardReportYearAction {
	return {
		type: DashboardActionTypes.SET_YEAR,
		payload,
	};
}

export function setDashboardYearReport(
	payload: PropertyYearReport
): SetDashboardYearReportAction {
	return {
		type: DashboardActionTypes.SET_DASHBOARD_YEAR_REPORT,
		payload,
	};
}

export function getDashboardYearReport(): GetDashboardYearReportAction {
	return {
		type: DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT,
	};
}

export function getDashboardYearReportStart(): GetDashboardYearReportStartAction {
	return {
		type: DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT_START,
	};
}

export function getDashboardYearReportFail(): GetDashboardYearReportFailAction {
	return {
		type: DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT_FAIL,
	};
}
