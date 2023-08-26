import { Expense } from "interfaces/expenses";
import { ComplexFilterItem } from "interfaces/filters";

export interface ExpensesState {
	expensesList: Array<Expense>;
	expensesTotal: number;
	isLoading: boolean;
	expensesFilter: ComplexFilterItem[];
}

export enum ExpensesActionTypes {
	GET_EXPENSES = "@@expenses/GET_EXPENSES",
	GET_EXPENSES_START = "@@expenses/GET_EXPENSES_START",
	GET_EXPENSES_FAIL = "@@expenses/GET_EXPENSES_FAIL",
	SET_EXPENSES = "@@expenses/SET_EXPENSES",
	SET_EXPENSES_FILTER = "@@expenses/SET_EXPENSES_FILTER",
}

export interface GetExpensesAction {
	type: ExpensesActionTypes.GET_EXPENSES;
	payload: {
		isLoadMore?: boolean;
	};
}

export interface GetExpensesStartAction {
	type: ExpensesActionTypes.GET_EXPENSES_START;
}

export interface GetExpensesFailAction {
	type: ExpensesActionTypes.GET_EXPENSES_FAIL;
}

export interface SetExpensesActionPayload {
	expenses: Expense[];
	total: number;
}

export interface SetExpensesAction {
	type: ExpensesActionTypes.SET_EXPENSES;
	payload: SetExpensesActionPayload;
}

export interface SetExpensesFilterAction {
	type: ExpensesActionTypes.SET_EXPENSES_FILTER;
	payload: ComplexFilterItem[];
}

export type ExpensesAction =
	| GetExpensesAction
	| GetExpensesStartAction
	| GetExpensesFailAction
	| SetExpensesAction
	| SetExpensesFilterAction;
