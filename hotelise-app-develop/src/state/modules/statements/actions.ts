import { ComplexFilterItem } from "interfaces/filters";
import {
	GetStatementsAction,
	GetStatementsFailAction,
	GetStatementsStartAction,
	SetStatementsAction,
	StatementsActionTypes,
	GetStatementsActionPayload,
	SetStatementsActionPayload,
	SetStatementsFilterAction,
} from "./types";

export function getStatements(
	payload: GetStatementsActionPayload
): GetStatementsAction {
	return {
		type: StatementsActionTypes.GET_STATEMENTS,
		payload,
	};
}

export function getStatementsStart(): GetStatementsStartAction {
	return {
		type: StatementsActionTypes.GET_STATEMENTS_START,
	};
}

export function getStatementsFail(): GetStatementsFailAction {
	return {
		type: StatementsActionTypes.GET_STATEMENTS_FAIL,
	};
}

export function setStatements(
	payload: SetStatementsActionPayload
): SetStatementsAction {
	return {
		type: StatementsActionTypes.SET_STATEMENTS,
		payload,
	};
}

export function setStatementsFilter(
	payload: ComplexFilterItem[]
): SetStatementsFilterAction {
	return {
		type: StatementsActionTypes.SET_STATEMENTS_FILTER,
		payload,
	};
}
