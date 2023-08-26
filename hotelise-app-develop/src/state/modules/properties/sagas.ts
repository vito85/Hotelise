import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import * as propertiesAction from "state/modules/properties/actions";
import PropertiesClient from "services/api/properties";
import ExpensesClient from "services/api/expenses";
import { Property } from "models/properties";
import { Expense } from "interfaces/expenses";
import {
	CityComplexFilter,
	ComplexFilterItem,
	ComplexFilterType,
	DateRangeFilter,
	SearchComplexFilter,
	StatementsFilter,
} from "interfaces/filters";

import StatementsClient from "services/api/statements";
import { Statement } from "interfaces/statements";
import ReportsClient from "services/api/reports";
import { GenerateReportResponse } from "models/reports";
import {
	GetPropertiesAction,
	GetPropertyDetailsAction,
	GetPropertyExpensesAction,
	GetPropertyReservationsAction,
	PropertiesActionTypes,
	GetPropertyStatementsAction,
} from "./types";
import {
	getPropertiesCount,
	getPropertiesFilters,
	getPropertiesList,
	getPropertyDetailsFilters,
	getPropertyDetailsInfo,
	getPropertyExpensesCount,
	getPropertyExpensesList,
	getPropertyReservationsCount,
	getPropertyStatementsFilter,
	getPropertyStatementsList,
} from "./selectors";

export function* loadProperties() {
	const res = (yield call(PropertiesClient.getProperties, {
		offset: 0,
		city: "",
		name: "",
	})) as AxiosResponse;

	const properties = res.data.content as Property[];

	return properties;
}

export function* handleGetProperties(action: GetPropertiesAction): Generator {
	yield put(propertiesAction.getPropertiesStart());

	const { isLoadMore } = action.payload;

	try {
		let propertiesList = [];

		const oldPropertiesList = (yield select(
			getPropertiesList
		)) as Array<Property>;
		const propertiesCount = (yield select(getPropertiesCount)) as number;
		const filters = (yield select(
			getPropertiesFilters
		)) as Array<ComplexFilterItem>;

		const cityFilter = filters.find(
			(filterItem) => filterItem.type === ComplexFilterType.CITY
		) as CityComplexFilter;
		const nameFilter = filters.find(
			(filterItem) => filterItem.type === ComplexFilterType.SEARCH
		) as SearchComplexFilter;

		const res = (yield call(PropertiesClient.getProperties, {
			offset: isLoadMore ? propertiesCount : 0,
			city: cityFilter?.value || "",
			name: nameFilter?.value || "",
		})) as AxiosResponse;

		const newPropertiesList = res.data.content;

		const propertiesTotal = res.data._metadata.totalCount;

		if (isLoadMore) {
			propertiesList = [...oldPropertiesList, ...newPropertiesList];
		} else {
			propertiesList = newPropertiesList;
		}

		yield put(
			propertiesAction.setProperties({
				propertiesList,
				propertiesTotal,
			})
		);
	} catch (error) {
		console.log({ error });
		yield put(propertiesAction.getPropertiesFail());
	}
}

export function* handleGetPropertyReservations(
	action: GetPropertyReservationsAction
): Generator {
	yield put(propertiesAction.getPropertyReservationsStart());

	const { id, isLoadMore } = action.payload;

	const propertyReservationsCount = (yield select(
		getPropertyReservationsCount
	)) as number;
	const filters = (yield select(getPropertyDetailsFilters)) as DateRangeFilter;

	try {
		const reportsRes = (yield call(ReportsClient.generateReport, {
			propertyIds: id,
			dateFrom: filters.dateFrom,
			dateTo: filters.dateTo,
			dateFromType: filters.dateFromType,
			dateToType: filters.dateToType,
		})) as AxiosResponse<GenerateReportResponse>;

		const report = reportsRes.data.content;

		const reservations = report.calculations.allAccountTransfers;

		yield put(propertiesAction.setPropertyReservations(reservations));
	} catch (error) {
		console.log({ error });
		yield put(propertiesAction.getPropertyReservationsFail());
	}
}

export function* handleGetPropertyDetails(
	action: GetPropertyDetailsAction
): Generator {
	const id = action.payload;

	try {
		const res = (yield call(
			PropertiesClient.getPropertyById,
			id
		)) as AxiosResponse;

		const propertyDetails = res.data.content as Property;

		yield put(propertiesAction.setPropertyDetails(propertyDetails));
	} catch (error) {
		console.log({ error });
	}
}

export function* handleGetPropertyExpenses(
	action: GetPropertyExpensesAction
): Generator {
	yield put(propertiesAction.getPropertyExpensesStart());
	const { id, isLoadMore } = action.payload;

	const propertyExpensesCount = (yield select(
		getPropertyExpensesCount
	)) as number;
	const oldPropertyExpenses = (yield select(
		getPropertyExpensesList
	)) as Array<Expense>;
	const filters = (yield select(getPropertyDetailsFilters)) as DateRangeFilter;

	try {
		const res = (yield call(ExpensesClient.getExpensesByPropertyId, {
			propertyIds: id,
			offset: isLoadMore ? propertyExpensesCount : 0,
			dateFrom: filters.dateFrom,
			dateTo: filters.dateTo,
			limit: 20,
		})) as AxiosResponse;

		let propertyExpenses = [];

		const newPropertyExpenses = res.data.content;

		const propertyExpensesTotal = res.data._metadata.totalCount;

		if (isLoadMore) {
			propertyExpenses = [...oldPropertyExpenses, ...newPropertyExpenses];
		} else {
			propertyExpenses = newPropertyExpenses;
		}

		yield put(
			propertiesAction.setPropertyExpenses({
				propertyExpenses,
				propertyExpensesTotal,
			})
		);
	} catch (error) {
		console.log({ error });
		yield put(propertiesAction.getPropertyExpensesFail());
	}
}

export function* handleGetPropertyStatements(
	action: GetPropertyStatementsAction
): Generator {
	yield put(propertiesAction.getPropertyStatementsStart());
	const { propertyId, isLoadMore } = action.payload;

	const filter = (yield select(
		getPropertyStatementsFilter
	)) as StatementsFilter;
	const oldStatements = (yield select(
		getPropertyStatementsList
	)) as Statement[];
	const { year, month } = filter;

	try {
		const res = (yield call(StatementsClient.getStatements, {
			propertyIds: propertyId,
			active: true,
			// month: month + 1,
			// year,
		})) as AxiosResponse;

		let propertyStatements = [];

		const newPropertyStatements = res.data.content;

		const statementsTotal = res.data._metadata.totalCount;

		if (isLoadMore) {
			propertyStatements = [...oldStatements, ...newPropertyStatements];
		} else {
			propertyStatements = newPropertyStatements;
		}

		yield put(
			propertiesAction.setPropertyStatements({
				statements: propertyStatements,
				statementsTotal,
			})
		);
	} catch (error) {
		console.log({ error });
		yield put(propertiesAction.getPropertyStatementsFail());
	}
}

export function* handleGeneratePropertyStatements(): Generator {
	try {
		yield put(propertiesAction.generatePropertyStatementsStart());

		const filter = (yield select(
			getPropertyStatementsFilter
		)) as StatementsFilter;
		const propertyDetails = (yield select(getPropertyDetailsInfo)) as Property;
		const { year, month } = filter;

		yield call(StatementsClient.generateStatement, {
			propertyId: propertyDetails.id,
			month: month + 1,
			year,
		});

		yield delay(1500);

		yield put(propertiesAction.generatePropertyStatementsSuccess());

		yield put(
			propertiesAction.getPropertyStatements({ propertyId: propertyDetails.id })
		);
	} catch (error) {
		console.log({ error });
		yield put(propertiesAction.generatePropertyStatementsFail());
	}
}

export function* propertiesSaga(): Generator {
	yield takeLatest(PropertiesActionTypes.GET_PROPERTIES, handleGetProperties);
	yield takeLatest(
		PropertiesActionTypes.GET_PROPERTY_DETAILS,
		handleGetPropertyDetails
	);
	yield takeLatest(
		PropertiesActionTypes.GET_PROPERTY_RESERVATIONS,
		handleGetPropertyReservations
	);
	yield takeLatest(
		PropertiesActionTypes.GET_PROPERTY_EXPENSES,
		handleGetPropertyExpenses
	);
	yield takeLatest(
		PropertiesActionTypes.GET_PROPERTY_STATEMENTS,
		handleGetPropertyStatements
	);
	yield takeLatest(
		PropertiesActionTypes.GENERATE_PROPERTY_STATEMENTS,
		handleGeneratePropertyStatements
	);
}
