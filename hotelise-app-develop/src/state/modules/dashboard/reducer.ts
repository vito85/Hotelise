import dayjs from "dayjs";
import produce from "immer";
import { ComplexFilterType } from "interfaces/filters";
import { defaultReportDateFilter } from "utils/report";
import { DashboardAction, DashboardActionTypes, DashboardState } from "./types";

const initialState: DashboardState = {
	report: null,
	isLoading: false,
	filter: [
		{
			type: ComplexFilterType.DATE,
			value: {
				...defaultReportDateFilter,
			},
		},
		{
			type: ComplexFilterType.PROPERTY_ID,
			value: "",
		},
	],
	yearReport: null,
	isYearReportLoading: false,
	selectedYear: dayjs().get("year"),
};

const dashboardReducer = (
	state = initialState,
	action: DashboardAction
): DashboardState =>
	produce(state, (draft: DashboardState) => {
		switch (action.type) {
			case DashboardActionTypes.GET_DASHBOARD_REPORT_START:
				draft.isLoading = true;

				return;
			case DashboardActionTypes.GET_DASHBOARD_REPORT_FAIL:
				draft.isLoading = true;

				return;
			case DashboardActionTypes.SET_DASHBOARD_REPORT:
				draft.report = action.payload;
				draft.isLoading = false;

				return;
			case DashboardActionTypes.SET_DASHBOARD_FILTER:
				draft.filter = action.payload;

				return;
			case DashboardActionTypes.SET_YEAR:
				draft.selectedYear = action.payload;

				return;
			case DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT_START:
				draft.isYearReportLoading = true;

				return;
			case DashboardActionTypes.GET_DASHBOARD_YEAR_REPORT_FAIL:
				draft.isYearReportLoading = false;

				return;
			case DashboardActionTypes.SET_DASHBOARD_YEAR_REPORT:
				draft.yearReport = action.payload;
				draft.isYearReportLoading = false;

				return;
			default:
				return state;
		}
	});

export default dashboardReducer;
