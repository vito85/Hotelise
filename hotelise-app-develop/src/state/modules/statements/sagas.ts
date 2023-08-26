import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";

import {
	ComplexFilterItem,
	ComplexFilterType,
	DateComplexFilter,
	PropertyIdComplexFilter,
} from "interfaces/filters";
import StatementsClient from "services/api/statements";
import * as statementsActions from "state/modules/statements/actions";
import { Statement } from "interfaces/statements";
import { Property } from "models/properties";
import dayjs from "dayjs";
import {
	getStatementsFilter,
	getStatementsList,
	getStatementsOnlyActiveStatus,
} from "./selectors";

import { GetStatementsAction, StatementsActionTypes } from "./types";
import { loadProperties } from "../properties";

export function* handleGetStatements(action: GetStatementsAction): Generator {
	const properties = (yield call(loadProperties)) as Property[];
	const propertyIds = properties.map((property) => property.id).join(",");
	const propertiesNamesMap = {} as {
		[n: string]: string;
	};

	properties.forEach((property) => {
		propertiesNamesMap[property.id] = property.name;
	});

	yield put(statementsActions.getStatementsStart());

	const { isLoadMore } = action.payload;

	const filters = (yield select(getStatementsFilter)) as ComplexFilterItem[];
	const oldStatements = (yield select(getStatementsList)) as Statement[];
	const onlyActiveStatus = (yield select(
		getStatementsOnlyActiveStatus
	)) as boolean;

	const propertyId = filters.find(
		(filter) => filter.type === ComplexFilterType.PROPERTY_ID
	) as PropertyIdComplexFilter;
	const dateFilter = filters.find(
		(filter) => filter.type === ComplexFilterType.DATE
	) as DateComplexFilter;

	try {
		const res = (yield call(StatementsClient.getStatements, {
			propertyIds: propertyId?.value || propertyIds,
			active: onlyActiveStatus,
			// month: dayjs(dateFilter.value?.dateFrom).get("month"),
			// year: dayjs(dateFilter.value?.dateFrom).get("year"),
		})) as AxiosResponse;

		let propertyStatements = [];

		let newPropertyStatements = res.data.content as Statement[];

		newPropertyStatements = newPropertyStatements.map((statement) => ({
			...statement,
			propertyName: propertiesNamesMap[statement.propertyId] || "",
		}));

		const statementsTotal = res.data._metadata.totalCount;

		if (isLoadMore) {
			propertyStatements = [...oldStatements, ...newPropertyStatements];
		} else {
			propertyStatements = newPropertyStatements;
		}

		yield put(
			statementsActions.setStatements({
				statements: propertyStatements,
				total: statementsTotal,
			})
		);
	} catch (error) {
		console.log({ error });
		yield put(statementsActions.getStatementsFail());
	}
}

export function* statementsSaga(): Generator {
	yield takeLatest(StatementsActionTypes.GET_STATEMENTS, handleGetStatements);
}
