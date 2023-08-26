import { Claim } from "interfaces/claims";
import { createSelector } from "reselect";
import { State } from "state/modules";

import { PropertiesState } from "./types";

export const getPropertiesState = (state: State): PropertiesState =>
	state.properties;

export const getPropertiesList = createSelector(
	getPropertiesState,
	(state) => state.propertiesList
);

export const getPropertiesTotal = createSelector(
	getPropertiesState,
	(state) => state.propertiesTotal
);

export const getPropertiesLoading = createSelector(
	getPropertiesState,
	(state) => state.isPropertiesLoading
);

export const getPropertiesCount = createSelector(
	getPropertiesState,
	(state) => state.propertiesList.length
);

export const getPropertyDetailsInfo = createSelector(
	getPropertiesState,
	(state) => state.propertyDetails
);

export const getPropertyReservationsList = createSelector(
	getPropertiesState,
	(state) => state.propertyReservations
);

// export const getPropertyReservationsTotal = createSelector(
// 	getPropertiesState,
// 	(state) => state.propertyReservationsTotal
// );

export const getPropertyReservationsLoading = createSelector(
	getPropertiesState,
	(state) => state.isPropertyReservationsLoading
);

export const getPropertyReservationsCount = createSelector(
	getPropertiesState,
	(state) => state.propertyReservations.length
);

export const getPropertyExpensesList = createSelector(
	getPropertiesState,
	(state) => state.propertyExpenses
);

export const getPropertyExpensesTotal = createSelector(
	getPropertiesState,
	(state) => state.propertyExpensesTotal
);

export const getPropertyExpensesLoading = createSelector(
	getPropertiesState,
	(state) => state.isPropertyExpensesLoading
);

export const getPropertyExpensesCount = createSelector(
	getPropertiesState,
	(state) => state.propertyExpenses.length
);

export const getPropertiesFilters = createSelector(
	getPropertiesState,
	(state) => state.filters
);

export const getPropertyDetailsFilters = createSelector(
	getPropertiesState,
	(state) => state.propertyDetailsFilters
);

export const getPropertyStatementsList = createSelector(
	getPropertiesState,
	(state) => state.propertyStatements
);

export const getPropertyStatementsCount = createSelector(
	getPropertiesState,
	(state) => state.propertyStatements.length
);

export const getPropertyStatementsTotal = createSelector(
	getPropertiesState,
	(state) => state.propertyStatementsTotal
);

export const getPropertyStatementsLoading = createSelector(
	getPropertiesState,
	(state) => state.isPropertyStatementsLoading
);

export const getPropertyStatementsGenerationLoading = createSelector(
	getPropertiesState,
	(state) => state.isPropertyStatementsGenerationLoading
);

export const getPropertyStatementsFilter = createSelector(
	getPropertiesState,
	(state) => state.propertyStatementsFilter
);

export const getPropertyStatementsOnlyActiveStatus = createSelector(
	getPropertiesState,
	(state) => state.onlyActiveStatements
);
