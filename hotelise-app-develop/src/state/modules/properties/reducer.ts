import produce from "immer";
import { ComplexFilterType } from "interfaces/filters";
import {
	PropertiesState,
	PropertiesActionTypes,
	PropertiesAction,
} from "state/modules/properties/types";
import {
	defaultPropertyDetailsFilters,
	defaultPropertyReportFilter,
	defaultPropertyStatementsFilter,
} from "utils/properties";

const initialState: PropertiesState = {
	propertiesList: [],
	propertiesTotal: 0,
	isPropertiesLoading: false,
	propertyDetails: null,
	isPropertyDetailsLoading: false,
	propertyReservations: [],
	// propertyReservationsTotal: 0,
	isPropertyReservationsLoading: false,
	propertyExpenses: [],
	propertyExpensesTotal: 0,
	isPropertyExpensesLoading: false,
	filters: [
		{
			type: ComplexFilterType.SEARCH,
			value: "",
		},
	],
	propertyDetailsFilters: defaultPropertyDetailsFilters,
	propertyStatementsFilter: defaultPropertyStatementsFilter,
	propertyStatements: [],
	propertyStatementsTotal: 0,
	isPropertyStatementsLoading: false,
	isPropertyStatementsGenerationLoading: false,
	onlyActiveStatements: true,
};

const propertiesReducer = (
	state = initialState,
	action: PropertiesAction
): PropertiesState =>
	produce(state, (draft: PropertiesState) => {
		switch (action.type) {
			case PropertiesActionTypes.GET_PROPERTIES_START:
				draft.isPropertiesLoading = true;

				return;
			case PropertiesActionTypes.GET_PROPERTIES_FAIL:
				draft.isPropertiesLoading = false;

				return;
			case PropertiesActionTypes.SET_PROPERTIES:
				draft.propertiesList = action.payload.propertiesList;
				draft.propertiesTotal = action.payload.propertiesTotal;
				draft.isPropertiesLoading = false;

				return;
			case PropertiesActionTypes.SET_PROPERTY_DETAILS:
				draft.propertyDetails = action.payload;

				return;
			case PropertiesActionTypes.GET_PROPERTY_RESERVATIONS_START:
				draft.isPropertyReservationsLoading = true;

				return;
			case PropertiesActionTypes.GET_PROPERTY_RESERVATIONS_FAIL:
				draft.isPropertyReservationsLoading = false;

				return;
			case PropertiesActionTypes.SET_PROPERTY_RESERVATIONS:
				draft.propertyReservations = action.payload;
				// draft.propertyReservations = action.payload.propertyReservations;
				// draft.propertyReservationsTotal =
				// 	action.payload.propertyReservationsTotal;
				draft.isPropertyReservationsLoading = false;

				return;
			case PropertiesActionTypes.GET_PROPERTY_EXPENSES_START:
				draft.isPropertyExpensesLoading = true;

				return;
			case PropertiesActionTypes.GET_PROPERTY_EXPENSES_FAIL:
				draft.isPropertyExpensesLoading = false;

				return;
			case PropertiesActionTypes.SET_PROPERTY_EXPENSES:
				draft.propertyExpenses = action.payload.propertyExpenses;
				draft.propertyExpensesTotal = action.payload.propertyExpensesTotal;
				draft.isPropertyExpensesLoading = false;

				return;
			case PropertiesActionTypes.SET_FILTERS:
				draft.filters = action.payload;

				return;
			case PropertiesActionTypes.SET_PROPERTY_DETAILS_FILTER:
				draft.propertyDetailsFilters = action.payload;

				return;
			case PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_START:
				draft.isPropertyStatementsGenerationLoading = true;

				return;
			case PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_FAIL:
				draft.isPropertyStatementsGenerationLoading = false;

				return;
			case PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_SUCCESS:
				draft.isPropertyStatementsGenerationLoading = false;

				return;
			case PropertiesActionTypes.GET_PROPERTY_STATEMENTS_START:
				draft.isPropertyStatementsLoading = true;

				return;
			case PropertiesActionTypes.GET_PROPERTY_STATEMENTS_FAIL:
				draft.isPropertyStatementsLoading = false;

				return;
			case PropertiesActionTypes.SET_PROPERTY_STATEMENTS:
				draft.isPropertyStatementsLoading = false;
				draft.propertyStatements = action.payload.statements;
				draft.propertyStatementsTotal = action.payload.statementsTotal;

				return;
			case PropertiesActionTypes.CHANGE_PROPERTY_STATEMENTS_FILTER:
				draft.propertyStatementsFilter = action.payload;

				return;
			case PropertiesActionTypes.SET_PROPERTY_STATEMENTS_ONLY_ACTIVE_STATUS:
				draft.onlyActiveStatements = action.payload;

				return;
			case PropertiesActionTypes.CLEAR_PROPERTY_DETAILS:
				draft.propertyDetailsFilters = initialState.propertyDetailsFilters;
				draft.propertyDetails = initialState.propertyDetails;
				draft.isPropertyDetailsLoading = initialState.isPropertyDetailsLoading;
				draft.propertyReservations = initialState.propertyReservations;
				// draft.propertyReservationsTotal =
				// 	initialState.propertyReservationsTotal;
				draft.isPropertyReservationsLoading =
					initialState.isPropertyReservationsLoading;
				draft.propertyExpenses = initialState.propertyExpenses;
				draft.propertyExpensesTotal = initialState.propertyExpensesTotal;
				draft.isPropertyExpensesLoading =
					initialState.isPropertyExpensesLoading;
				draft.propertyStatements = initialState.propertyStatements;
				draft.propertyStatementsTotal = initialState.propertyStatementsTotal;
				draft.isPropertyStatementsLoading =
					initialState.isPropertyStatementsLoading;
				draft.isPropertyStatementsGenerationLoading =
					initialState.isPropertyStatementsGenerationLoading;
				draft.onlyActiveStatements = initialState.onlyActiveStatements;

				return;
			default:
				return state;
		}
	});

export default propertiesReducer;
