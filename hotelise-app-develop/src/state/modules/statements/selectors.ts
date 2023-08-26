import { createSelector } from "reselect";
import { State } from "state/modules";

import { StatementsState } from "./types";

export const getStatementsState = (state: State): StatementsState =>
	state.statements;

export const getStatementsList = createSelector(
	getStatementsState,
	(state) => state.statementsList
);

export const getStatementsTotal = createSelector(
	getStatementsState,
	(state) => state.statementsTotal
);

export const getStatementsLoading = createSelector(
	getStatementsState,
	(state) => state.isLoading
);

export const getStatementsCount = createSelector(
	getStatementsState,
	(state) => state.statementsList.length
);

export const getStatementsFilter = createSelector(
	getStatementsState,
	(state) => state.filter
);

export const getStatementsOnlyActiveStatus = createSelector(
	getStatementsState,
	(state) => state.onlyActive
);
