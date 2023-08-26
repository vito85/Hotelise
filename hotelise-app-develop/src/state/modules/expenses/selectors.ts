import { createSelector } from "reselect";
import { State } from "state/modules";
import { ExpensesState } from "./types";

export const getExpensesState = (state: State): ExpensesState => state.expenses;

export const getExpensesList = createSelector(
	getExpensesState,
	(state) => state.expensesList
);

export const getExpensesLoading = createSelector(
	getExpensesState,
	(state) => state.isLoading
);

export const getExpensesTotal = createSelector(
	getExpensesState,
	(state) => state.expensesTotal
);

export const getExpensesCount = createSelector(
	getExpensesState,
	(state) => state.expensesList.length
);

export const getExpensesFilter = createSelector(
	getExpensesState,
	(state) => state.expensesFilter
);

// export const getExpensesCalendarItems = createSelector(
// 	getExpensesState,
// 	(state) => state.ExpensesCalendarItems
// );

// export const getExpensesCalendarLoading = createSelector(
// 	getExpensesState,
// 	(state) => state.isExpensesCalendarLoading
// );

// export const getExpensesCalendarDateRange = createSelector(
// 	getExpensesState,
// 	(state) => state.ExpensesCalendarRange
// );
