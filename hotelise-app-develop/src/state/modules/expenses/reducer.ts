import produce from "immer";
import { ComplexFilterType } from "interfaces/filters";
import { defaultExpensesDateFilter } from "utils/expenses";
import { ExpensesState, ExpensesAction, ExpensesActionTypes } from "./types";

const initialState: ExpensesState = {
	expensesList: [],
	expensesTotal: 0,
	isLoading: false,
	expensesFilter: [
		{
			type: ComplexFilterType.DATE,
			value: {
				...defaultExpensesDateFilter,
			},
		},
	],
};

const expensesReducer = (
	state = initialState,
	action: ExpensesAction
): ExpensesState =>
	produce(state, (draft: ExpensesState) => {
		switch (action.type) {
			case ExpensesActionTypes.GET_EXPENSES_START:
				draft.isLoading = true;

				return;
			case ExpensesActionTypes.GET_EXPENSES_FAIL:
				draft.isLoading = false;

				return;
			case ExpensesActionTypes.SET_EXPENSES:
				draft.expensesList = action.payload.expenses;
				draft.expensesTotal = action.payload.total;
				draft.isLoading = false;

				return;
			case ExpensesActionTypes.SET_EXPENSES_FILTER:
				draft.expensesFilter = action.payload;

				return;
			default:
				return state;
		}
	});

export default expensesReducer;
