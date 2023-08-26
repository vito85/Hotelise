import {
	ComplexFilterItem,
	DateRangeFilter,
	StatementsFilter,
} from "interfaces/filters";
import { ReportTableItemWithTransfer } from "interfaces/reports";
import { Property } from "models/properties";
import {
	PropertiesActionTypes,
	GetPropertiesAction,
	GetPropertyDetailsAction,
	SetPropertiesActionPayload,
	SetPropertiesAction,
	GetPropertyReservationsAction,
	SetPropertyDetailsAction,
	SetPropertyReservationsAction,
	GetPropertyExpensesAction,
	SetPropertyExpensesAction,
	SetPropertyExpensesActionPayload,
	GetPropertiesStartAction,
	GetPropertiesFailAction,
	GetPropertyReservationsStartAction,
	GetPropertyReservationsFailAction,
	GetPropertyExpensesStartAction,
	GetPropertyExpensesFailAction,
	ChangePropertiesFilterAction,
	PropertyFilter,
	SetPropertiesFilterAction,
	ChangePropertiesFilterActionPayload,
	SetPropertyDetailsFilterAction,
	ClearPropertyDetailsAction,
	GetPropertyStatementsAction,
	GetPropertyStatementsStartAction,
	GetPropertyStatementsFailAction,
	SetPropertyStatementsAction,
	GetPropertyStatementsActionPayload,
	SetPropertyStatementsActionPayload,
	ChangePropertyStatementsFilterAction,
	GeneratePropertyStatementsAction,
	GeneratePropertyStatementsStartAction,
	GeneratePropertyStatementsFailAction,
	GeneratePropertyStatementsSuccessAction,
	SetPropertyStatementsActiveStatusAction,
} from "./types";

export function getProperties(isLoadMore?: boolean): GetPropertiesAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTIES,
		payload: {
			isLoadMore,
		},
	};
}

export function getPropertiesStart(): GetPropertiesStartAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTIES_START,
	};
}

export function getPropertiesFail(): GetPropertiesFailAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTIES_FAIL,
	};
}

export function setProperties(
	payload: SetPropertiesActionPayload
): SetPropertiesAction {
	return {
		type: PropertiesActionTypes.SET_PROPERTIES,
		payload,
	};
}

export function getPropertyDetails(id: string): GetPropertyDetailsAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_DETAILS,
		payload: id,
	};
}

export function setPropertyDetails(
	property: Property
): SetPropertyDetailsAction {
	return {
		type: PropertiesActionTypes.SET_PROPERTY_DETAILS,
		payload: property,
	};
}

export function getPropertyReservations(
	id: string,
	isLoadMore?: boolean
): GetPropertyReservationsAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_RESERVATIONS,
		payload: {
			id,
			isLoadMore,
		},
	};
}

export function getPropertyReservationsStart(): GetPropertyReservationsStartAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_RESERVATIONS_START,
	};
}

export function getPropertyReservationsFail(): GetPropertyReservationsFailAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_RESERVATIONS_FAIL,
	};
}

export function setPropertyReservations(
	propertyReservations: Array<ReportTableItemWithTransfer>
): SetPropertyReservationsAction {
	return {
		type: PropertiesActionTypes.SET_PROPERTY_RESERVATIONS,
		payload: propertyReservations,
	};
}

export function getPropertyExpenses(
	id: string,
	isLoadMore?: boolean
): GetPropertyExpensesAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_EXPENSES,
		payload: {
			id,
			isLoadMore,
		},
	};
}

export function getPropertyExpensesStart(): GetPropertyExpensesStartAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_EXPENSES_START,
	};
}

export function getPropertyExpensesFail(): GetPropertyExpensesFailAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_EXPENSES_FAIL,
	};
}

export function setPropertyExpenses(
	payload: SetPropertyExpensesActionPayload
): SetPropertyExpensesAction {
	return {
		type: PropertiesActionTypes.SET_PROPERTY_EXPENSES,
		payload,
	};
}

export function changePropertiesFilter(
	payload: ChangePropertiesFilterActionPayload
): ChangePropertiesFilterAction {
	return {
		type: PropertiesActionTypes.CHANGE_FILTER,
		payload,
	};
}

export function setPropertiesFilter(
	payload: Array<ComplexFilterItem>
): SetPropertiesFilterAction {
	return {
		type: PropertiesActionTypes.SET_FILTERS,
		payload,
	};
}

export function setPropertyDetailsFilter(
	payload: DateRangeFilter
): SetPropertyDetailsFilterAction {
	return {
		type: PropertiesActionTypes.SET_PROPERTY_DETAILS_FILTER,
		payload,
	};
}

export function clearPropertyDetails(): ClearPropertyDetailsAction {
	return {
		type: PropertiesActionTypes.CLEAR_PROPERTY_DETAILS,
	};
}

//

export function getPropertyStatements(
	payload: GetPropertyStatementsActionPayload
): GetPropertyStatementsAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_STATEMENTS,
		payload,
	};
}

export function getPropertyStatementsStart(): GetPropertyStatementsStartAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_STATEMENTS_START,
	};
}

export function getPropertyStatementsFail(): GetPropertyStatementsFailAction {
	return {
		type: PropertiesActionTypes.GET_PROPERTY_STATEMENTS_FAIL,
	};
}

export function setPropertyStatements(
	payload: SetPropertyStatementsActionPayload
): SetPropertyStatementsAction {
	return {
		type: PropertiesActionTypes.SET_PROPERTY_STATEMENTS,
		payload,
	};
}

//

export function generatePropertyStatements(): GeneratePropertyStatementsAction {
	return {
		type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS,
	};
}

export function generatePropertyStatementsStart(): GeneratePropertyStatementsStartAction {
	return {
		type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_START,
	};
}

export function generatePropertyStatementsFail(): GeneratePropertyStatementsFailAction {
	return {
		type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_FAIL,
	};
}

export function generatePropertyStatementsSuccess(): GeneratePropertyStatementsSuccessAction {
	return {
		type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_SUCCESS,
	};
}

//

export function changePropertyStatementsFilter(
	payload: StatementsFilter
): ChangePropertyStatementsFilterAction {
	return {
		type: PropertiesActionTypes.CHANGE_PROPERTY_STATEMENTS_FILTER,
		payload,
	};
}

export function setPropertyStatementsActiveStatus(
	payload: boolean
): SetPropertyStatementsActiveStatusAction {
	return {
		type: PropertiesActionTypes.SET_PROPERTY_STATEMENTS_ONLY_ACTIVE_STATUS,
		payload,
	};
}
