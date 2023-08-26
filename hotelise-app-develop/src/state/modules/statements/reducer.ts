import produce from "immer";
import { ComplexFilterType } from "interfaces/filters";
import { defaultStatementsDateFilter } from "utils/statements";
import {
	StatementsState,
	StatementsAction,
	StatementsActionTypes,
} from "./types";

const initialState: StatementsState = {
	statementsList: [],
	statementsTotal: 0,
	isLoading: false,
	onlyActive: true,
	filter: [],
};

const statementsReducer = (
	state = initialState,
	action: StatementsAction
): StatementsState =>
	produce(state, (draft: StatementsState) => {
		switch (action.type) {
			case StatementsActionTypes.GET_STATEMENTS_START:
				draft.isLoading = true;

				return;
			case StatementsActionTypes.GET_STATEMENTS_FAIL:
				draft.isLoading = false;

				return;
			case StatementsActionTypes.SET_STATEMENTS:
				draft.statementsList = action.payload.statements;
				draft.statementsTotal = action.payload.total;
				draft.isLoading = false;

				return;

			case StatementsActionTypes.SET_STATEMENTS_FILTER:
				draft.filter = action.payload;

				return;
			default:
				return state;
		}
	});

export default statementsReducer;
