import { createSelector } from "reselect";
import { State } from "state/modules";

import { DashboardState } from "./types";

export const getDashboardState = (state: State): DashboardState =>
	state.dashboard;

export const getDashboardFilter = createSelector(
	getDashboardState,
	(state) => state.filter
);

export const getDashboardSelectedYear = createSelector(
	getDashboardState,
	(state) => state.selectedYear
);

export const getDashboardYearReportData = createSelector(
	getDashboardState,
	(state) => state.yearReport
);

export const getDashboardReportData = createSelector(
	getDashboardState,
	(state) => state.report
);

export const getDashboardReportLoading = createSelector(
	getDashboardState,
	(state) => state.isLoading
);

export const getDashboardYearReportLoading = createSelector(
	getDashboardState,
	(state) => state.isYearReportLoading
);
