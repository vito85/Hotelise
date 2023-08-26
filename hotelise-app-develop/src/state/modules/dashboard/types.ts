import { ComplexFilterItem } from "interfaces/filters";
import { PropertyReport, PropertyYearReport } from "interfaces/reports";

export interface DashboardState {
	yearReport: PropertyYearReport | null;
	selectedYear: number;
	report: PropertyReport | null;
	filter: ComplexFilterItem[];
	isLoading: boolean;
	isYearReportLoading: boolean;
}

export enum DashboardActionTypes {
	GET_DASHBOARD_REPORT = "@@dashboard/GET_DASHBOARD_REPORT",
	GET_DASHBOARD_REPORT_START = "@@dashboard/GET_DASHBOARD_REPORT_START",
	GET_DASHBOARD_REPORT_FAIL = "@@dashboard/GET_DASHBOARD_REPORT_FAIL",
	SET_DASHBOARD_REPORT = "@@dashboard/SET_DASHBOARD_REPORT",
	SET_DASHBOARD_FILTER = "@@dashboard/SET_DASHBOARD_FILTER",

	GET_DASHBOARD_YEAR_REPORT = "@@dashboard/GET_DASHBOARD_YEAR_REPORT",
	GET_DASHBOARD_YEAR_REPORT_START = "@@dashboard/GET_DASHBOARD_YEAR_REPORT_START",
	GET_DASHBOARD_YEAR_REPORT_FAIL = "@@dashboard/GET_DASHBOARD_YEAR_REPORT_FAIL",
	SET_DASHBOARD_YEAR_REPORT = "@@dashboard/SET_DASHBOARD_YEAR_REPORT",

	SET_YEAR = "@@dashboard/SET_YEAR",
}

export interface SetDashboardFilterAction {
	type: DashboardActionTypes.SET_DASHBOARD_FILTER;
	payload: ComplexFilterItem[];
}

export interface GetDashboardReportAction {
	type: DashboardActionTypes.GET_DASHBOARD_REPORT;
}

export interface GetDashboardReportStartAction {
	type: DashboardActionTypes.GET_DASHBOARD_REPORT_START;
}

export interface GetDashboardReportFailAction {
	type: DashboardActionTypes.GET_DASHBOARD_REPORT_FAIL;
}

export interface SetDashboardReportAction {
	type: DashboardActionTypes.SET_DASHBOARD_REPORT;
	payload: PropertyReport;
}

export interface SetDashboardReportYearAction {
	type: DashboardActionTypes.SET_YEAR;
	payload: number;
}

export interface GetDashboardYearReportAction {
	type: DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT;
}

export interface GetDashboardYearReportStartAction {
	type: DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT_START;
}

export interface GetDashboardYearReportFailAction {
	type: DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT_FAIL;
}

export interface SetDashboardYearReportAction {
	type: DashboardActionTypes.SET_DASHBOARD_YEAR_REPORT;
	payload: PropertyYearReport;
}

export type DashboardAction =
	| GetDashboardReportAction
	| SetDashboardReportAction
	| SetDashboardFilterAction
	| SetDashboardReportYearAction
	| SetDashboardYearReportAction
	| GetDashboardYearReportAction
	| GetDashboardYearReportStartAction
	| GetDashboardYearReportFailAction
	| GetDashboardReportStartAction
	| GetDashboardReportFailAction;
