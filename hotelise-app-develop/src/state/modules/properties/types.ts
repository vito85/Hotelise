import { Expense } from "interfaces/expenses";
import { PropertyFilterValue } from "interfaces/properties";
import {
	ComplexFilterItem,
	DateRangeFilter,
	StatementsFilter,
} from "interfaces/filters";
import { ReportTableItemWithTransfer } from "interfaces/reports";
import { Property } from "models/properties";
import { Statement } from "interfaces/statements";

export interface PropertyFeatures {
	sync: false;
	heartbeats: true;
	stealth: false;
}

export interface PropertyAddressCoordinates {
	latitude: number;
	longitude: number;
}

export interface PropertyAddress {
	apartment: string;
	street: string;
	city: string;
	state: string;
	country: string;
	postcode: string;
	coordinates: PropertyAddressCoordinates;
	display: string;
}

export interface PropertyFilter {
	filter: PropertyFilterValue;
	value: string;
}

export interface PropertiesState {
	propertiesList: Array<Property>;
	isPropertiesLoading: boolean;
	propertiesTotal: number;
	propertyDetails: Property | null;
	isPropertyDetailsLoading: boolean;
	propertyReservations: Array<ReportTableItemWithTransfer>;
	// propertyReservationsTotal: number;
	isPropertyReservationsLoading: boolean;
	propertyExpenses: Array<Expense>;
	propertyExpensesTotal: number;
	isPropertyExpensesLoading: boolean;
	filters: ComplexFilterItem[];
	propertyDetailsFilters: DateRangeFilter;
	propertyStatements: Statement[];
	propertyStatementsTotal: number;
	isPropertyStatementsLoading: boolean;
	isPropertyStatementsGenerationLoading: boolean;
	propertyStatementsFilter: StatementsFilter;
	onlyActiveStatements: boolean;
}

export enum PropertiesActionTypes {
	GET_PROPERTIES = "@@property/GET_PROPERTIES",
	GET_PROPERTIES_START = "@@property/GET_PROPERTIES_START",
	GET_PROPERTIES_FAIL = "@@property/GET_PROPERTIES_FAIL",
	SET_PROPERTIES = "@@property/SET_PROPERTIES",

	GET_PROPERTY_DETAILS = "@@property/GET_PROPERTY_DETAILS",
	GET_PROPERTY_DETAILS_START = "@@property/GET_PROPERTY_DETAILS_START",
	GET_PROPERTY_DETAILS_FAIL = "@@property/GET_PROPERTY_DETAILS_FAIL",
	SET_PROPERTY_DETAILS = "@@property/SET_PROPERTY_DETAILS",
	CLEAR_PROPERTY_DETAILS = "@@property/CLEAR_PROPERTY_DETAILS",

	GET_PROPERTY_RESERVATIONS = "@@property/GET_PROPERTY_RESERVATIONS",
	GET_PROPERTY_RESERVATIONS_START = "@@property/GET_PROPERTY_RESERVATIONS_START",
	GET_PROPERTY_RESERVATIONS_FAIL = "@@property/GET_PROPERTY_RESERVATIONS_FAIL",
	SET_PROPERTY_RESERVATIONS = "@@property/SET_PROPERTY_RESERVATIONS",

	GET_PROPERTY_EXPENSES = "@@property/GET_PROPERTY_EXPENSES",
	GET_PROPERTY_EXPENSES_START = "@@property/GET_PROPERTY_EXPENSES_START",
	GET_PROPERTY_EXPENSES_FAIL = "@@property/GET_PROPERTY_EXPENSES_FAIL",
	SET_PROPERTY_EXPENSES = "@@property/SET_PROPERTY_EXPENSES",

	CHANGE_FILTER = "@@property/CHANGE_FILTER",
	SET_FILTERS = "@@property/SET_FILTERS",

	CHANGE_PROPERTY_DETAILS_FILTER = "@@property/CHANGE_PROPERTY_DETAILS_FILTER",
	SET_PROPERTY_DETAILS_FILTER = "@@property/SET_PROPERTY_DETAILS_FILTER",
	RESET_PROPERTY_DETAILS_FILTER = "@@property/RESET_PROPERTY_DETAILS_FILTER",

	SET_PROPERTY_OWNERS = "@@property/SET_PROPERTY_OWNERS",

	GENERATE_PROPERTY_STATEMENTS = "@@property/GENERATE_PROPERTY_STATEMENTS",
	GENERATE_PROPERTY_STATEMENTS_START = "@@property/GENERATE_PROPERTY_STATEMENTS_START",
	GENERATE_PROPERTY_STATEMENTS_FAIL = "@@property/GENERATE_PROPERTY_STATEMENTS_FAIL",
	GENERATE_PROPERTY_STATEMENTS_SUCCESS = "@@property/GENERATE_PROPERTY_STATEMENTS_SUCCESS",

	GET_PROPERTY_STATEMENTS = "@@property/GET_PROPERTY_STATEMENTS",
	GET_PROPERTY_STATEMENTS_START = "@@property/GET_PROPERTY_STATEMENTS_START",
	GET_PROPERTY_STATEMENTS_FAIL = "@@property/GET_PROPERTY_STATEMENTS_FAIL",
	SET_PROPERTY_STATEMENTS = "@@property/SET_PROPERTY_STATEMENTS",

	CHANGE_PROPERTY_STATEMENTS_FILTER = "@@property/CHANGE_PROPERTY_STATEMENTS_FILTER",
	SET_PROPERTY_STATEMENTS_ONLY_ACTIVE_STATUS = "@@property/SET_PROPERTY_STATEMENTS_ONLY_ACTIVE_STATUS",
}

export enum ChangePropertiesFilterReason {
	CREATE,
	DELETE,
	UPDATE,
	CLEAR_ALL,
}
export interface ResetPropertyDetailsFilterAction {
	type: PropertiesActionTypes.RESET_PROPERTY_DETAILS_FILTER;
}

export interface SetPropertyDetailsFilterAction {
	type: PropertiesActionTypes.SET_PROPERTY_DETAILS_FILTER;
	payload: DateRangeFilter;
}

export interface ChangePropertiesFilterActionPayload {
	filterItem?: PropertyFilter;
	reason: ChangePropertiesFilterReason;
}

export interface ChangePropertiesFilterAction {
	type: PropertiesActionTypes.CHANGE_FILTER;
	payload: ChangePropertiesFilterActionPayload;
}

export interface SetPropertiesFilterAction {
	type: PropertiesActionTypes.SET_FILTERS;
	payload: Array<ComplexFilterItem>;
}

export interface SetPropertiesActionPayload {
	propertiesList: Array<Property>;
	propertiesTotal: number;
}

export interface GetPropertiesAction {
	type: PropertiesActionTypes.GET_PROPERTIES;
	payload: {
		isLoadMore?: boolean;
	};
}

export interface GetPropertiesStartAction {
	type: PropertiesActionTypes.GET_PROPERTIES_START;
}

export interface GetPropertiesFailAction {
	type: PropertiesActionTypes.GET_PROPERTIES_FAIL;
}

export interface SetPropertiesAction {
	type: PropertiesActionTypes.SET_PROPERTIES;
	payload: SetPropertiesActionPayload;
}

export interface GetPropertyDetailsAction {
	type: PropertiesActionTypes.GET_PROPERTY_DETAILS;
	payload: string;
}

export interface SetPropertyDetailsAction {
	type: PropertiesActionTypes.SET_PROPERTY_DETAILS;
	payload: Property;
}

export interface GetPropertyReservationsAction {
	type: PropertiesActionTypes.GET_PROPERTY_RESERVATIONS;
	payload: {
		id: string;
		isLoadMore?: boolean;
	};
}

export interface GetPropertyReservationsStartAction {
	type: PropertiesActionTypes.GET_PROPERTY_RESERVATIONS_START;
}

export interface GetPropertyReservationsFailAction {
	type: PropertiesActionTypes.GET_PROPERTY_RESERVATIONS_FAIL;
}

export interface SetPropertyReservationsAction {
	type: PropertiesActionTypes.SET_PROPERTY_RESERVATIONS;
	payload: ReportTableItemWithTransfer[];
}

export interface GetPropertyExpensesAction {
	type: PropertiesActionTypes.GET_PROPERTY_EXPENSES;
	payload: {
		id: string;
		isLoadMore?: boolean;
	};
}

export interface GetPropertyExpensesStartAction {
	type: PropertiesActionTypes.GET_PROPERTY_EXPENSES_START;
}

export interface GetPropertyExpensesFailAction {
	type: PropertiesActionTypes.GET_PROPERTY_EXPENSES_FAIL;
}

export interface SetPropertyExpensesActionPayload {
	propertyExpenses: Array<Expense>;
	propertyExpensesTotal: number;
}

export interface SetPropertyExpensesAction {
	type: PropertiesActionTypes.SET_PROPERTY_EXPENSES;
	payload: SetPropertyExpensesActionPayload;
}

export interface ClearPropertyDetailsAction {
	type: PropertiesActionTypes.CLEAR_PROPERTY_DETAILS;
}

export interface GetPropertyStatementsActionPayload {
	propertyId: string;
	isLoadMore?: boolean;
}

export interface GetPropertyStatementsAction {
	type: PropertiesActionTypes.GET_PROPERTY_STATEMENTS;
	payload: GetPropertyStatementsActionPayload;
}
export interface GetPropertyStatementsStartAction {
	type: PropertiesActionTypes.GET_PROPERTY_STATEMENTS_START;
}
export interface GetPropertyStatementsFailAction {
	type: PropertiesActionTypes.GET_PROPERTY_STATEMENTS_FAIL;
}

export interface GeneratePropertyStatementsAction {
	type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS;
	// payload: GetPropertyStatementsActionPayload;
}
export interface GeneratePropertyStatementsStartAction {
	type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_START;
}
export interface GeneratePropertyStatementsFailAction {
	type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_FAIL;
}

export interface GeneratePropertyStatementsSuccessAction {
	type: PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS_SUCCESS;
}

export interface SetPropertyStatementsActionPayload {
	statements: Statement[];
	statementsTotal: number;
}

export interface SetPropertyStatementsAction {
	type: PropertiesActionTypes.SET_PROPERTY_STATEMENTS;
	payload: SetPropertyStatementsActionPayload;
}

export interface ChangePropertyStatementsFilterAction {
	type: PropertiesActionTypes.CHANGE_PROPERTY_STATEMENTS_FILTER;
	payload: StatementsFilter;
}

export interface SetPropertyStatementsActiveStatusAction {
	type: PropertiesActionTypes.SET_PROPERTY_STATEMENTS_ONLY_ACTIVE_STATUS;
	payload: boolean;
}

export type PropertiesAction =
	| GetPropertiesAction
	| SetPropertiesAction
	| GetPropertyDetailsAction
	| SetPropertyDetailsAction
	| GetPropertyReservationsAction
	| SetPropertyReservationsAction
	| GetPropertyExpensesAction
	| SetPropertyExpensesAction
	| GetPropertiesStartAction
	| GetPropertiesFailAction
	| GetPropertyReservationsStartAction
	| GetPropertyReservationsFailAction
	| GetPropertyExpensesStartAction
	| GetPropertyExpensesFailAction
	| ChangePropertiesFilterAction
	| SetPropertiesFilterAction
	| SetPropertyDetailsFilterAction
	| ResetPropertyDetailsFilterAction
	| ClearPropertyDetailsAction
	| GetPropertyStatementsAction
	| GetPropertyStatementsStartAction
	| GetPropertyStatementsFailAction
	| SetPropertyStatementsAction
	| ChangePropertyStatementsFilterAction
	| GeneratePropertyStatementsAction
	| GeneratePropertyStatementsStartAction
	| GeneratePropertyStatementsFailAction
	| GeneratePropertyStatementsSuccessAction
	| SetPropertyStatementsActiveStatusAction;
