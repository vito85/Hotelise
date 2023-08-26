import { ComplexFilterItem } from "interfaces/filters";
import {
	GetExpensesAction,
	GetExpensesStartAction,
	GetExpensesFailAction,
	SetExpensesAction,
	ExpensesActionTypes,
	SetExpensesActionPayload,
	SetExpensesFilterAction,
} from "./types";

export function getExpenses(isLoadMore?: boolean): GetExpensesAction {
	return {
		type: ExpensesActionTypes.GET_EXPENSES,
		payload: {
			isLoadMore,
		},
	};
}

export function getExpensesStart(): GetExpensesStartAction {
	return {
		type: ExpensesActionTypes.GET_EXPENSES_START,
	};
}

export function getExpensesFail(): GetExpensesFailAction {
	return {
		type: ExpensesActionTypes.GET_EXPENSES_FAIL,
	};
}

export function setExpenses(
	payload: SetExpensesActionPayload
): SetExpensesAction {
	return {
		type: ExpensesActionTypes.SET_EXPENSES,
		payload,
	};
}

export function setExpensesFilter(
	payload: ComplexFilterItem[]
): SetExpensesFilterAction {
	return {
		type: ExpensesActionTypes.SET_EXPENSES_FILTER,
		payload,
	};
}
