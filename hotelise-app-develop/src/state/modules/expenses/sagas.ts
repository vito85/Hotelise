import { call, put, select, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import * as expensesActions from "state/modules/expenses/actions";

import { Expense } from "interfaces/expenses";
import ExpensesClient from "services/api/expenses";

import {
	ComplexFilterItem,
	ComplexFilterType,
	DateComplexFilter,
	DateRangeFilter,
	PropertyIdComplexFilter,
} from "interfaces/filters";
import { Property } from "models/properties";
import { defaultReservationsDateFilter } from "utils/reservations";
import { defaultExpensesDateFilter } from "utils/expenses";
import { ExpensesActionTypes, GetExpensesAction } from "./types";
import {
	getExpensesCount,
	getExpensesFilter,
	getExpensesList,
} from "./selectors";
import { loadProperties } from "../properties";

export function* handleGetExpenses(action: GetExpensesAction): Generator {
	yield put(expensesActions.getExpensesStart());

	const properties = (yield call(loadProperties)) as Property[];
	const propertyIds = properties.map((property) => property.id).join(",");
	const propertiesNamesMap = {} as {
		[n: string]: string;
	};

	properties.forEach((property) => {
		propertiesNamesMap[property.id] = property.name;
	});

	const { isLoadMore } = action.payload;

	const propertyExpensesCount = (yield select(getExpensesCount)) as number;
	const oldExpenses = (yield select(getExpensesList)) as Array<Expense>;
	const filters = (yield select(getExpensesFilter)) as ComplexFilterItem[];

	try {
		const propertyId = filters.find(
			(filter) => filter.type === ComplexFilterType.PROPERTY_ID
		) as PropertyIdComplexFilter;

		const dateFilter = (filters.find(
			(filter) => filter.type === ComplexFilterType.DATE
		) || defaultReservationsDateFilter) as DateComplexFilter;

		const res = (yield call(ExpensesClient.getExpenses, {
			offset: isLoadMore ? propertyExpensesCount : 0,
			dateFrom:
				dateFilter?.value?.dateFrom || defaultExpensesDateFilter.dateFrom,
			dateTo: dateFilter?.value?.dateTo || defaultExpensesDateFilter.dateTo,
			propertyIds: propertyId?.value || propertyIds,
		})) as AxiosResponse;

		let expenses = [];

		let newExpenses = res.data.content as Expense[];

		newExpenses = newExpenses.map((expense) => ({
			...expense,
			propertyName: propertiesNamesMap[expense?.propertyId] || "",
		}));

		const expensesTotal = res.data._metadata.totalCount;

		if (isLoadMore) {
			expenses = [...oldExpenses, ...newExpenses];
		} else {
			expenses = newExpenses;
		}

		yield put(
			expensesActions.setExpenses({
				expenses,
				total: expensesTotal,
			})
		);
	} catch (error) {
		console.log({ error });
		yield put(expensesActions.getExpensesFail());
	}
}

export function* expensesSaga(): Generator {
	yield takeLatest(ExpensesActionTypes.GET_EXPENSES, handleGetExpenses);
}
