import { ComplexFilterItem } from "interfaces/filters";
import { Statement } from "interfaces/statements";

export interface StatementsState {
	statementsList: Statement[];
	statementsTotal: number;
	filter: ComplexFilterItem[];
	isLoading: boolean;
	onlyActive: boolean;
}

export enum StatementsActionTypes {
	GET_STATEMENTS = "@@statements/GET_STATEMENTS",
	GET_STATEMENTS_START = "@@statements/GET_STATEMENTS_START",
	GET_STATEMENTS_FAIL = "@@statements/GET_STATEMENTS_FAIL",
	SET_STATEMENTS = "@@statements/SET_STATEMENTS",
	SET_STATEMENTS_FILTER = "@@statements/SET_STATEMENTS_FILTER",
}

export interface GetStatementsActionPayload {
	isLoadMore?: boolean;
}

export interface GetStatementsAction {
	type: StatementsActionTypes.GET_STATEMENTS;
	payload: GetStatementsActionPayload;
}

export interface GetStatementsStartAction {
	type: StatementsActionTypes.GET_STATEMENTS_START;
}

export interface GetStatementsFailAction {
	type: StatementsActionTypes.GET_STATEMENTS_FAIL;
}

export interface SetStatementsActionPayload {
	statements: Statement[];
	total: number;
}

export interface SetStatementsAction {
	type: StatementsActionTypes.SET_STATEMENTS;
	payload: SetStatementsActionPayload;
}

export interface SetStatementsFilterAction {
	type: StatementsActionTypes.SET_STATEMENTS_FILTER;
	payload: ComplexFilterItem[];
}

export type StatementsAction =
	| GetStatementsAction
	| GetStatementsStartAction
	| GetStatementsFailAction
	| SetStatementsAction
	| SetStatementsFilterAction;
