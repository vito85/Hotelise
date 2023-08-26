import { AxiosResponse } from "axios";
import { build } from "search-params";

import { CreateExpenseReqBody, ExpensesStatuses } from "interfaces/expenses";

import { GetExpensesByPropertyIdReqParams } from "models/properties";

import { GetExpensesReqParams } from "models/expenses";
import { store } from "Root";
import $http from "./instance";

class ExpensesClient {
	public static async getExpenses(
		params: GetExpensesReqParams
	): Promise<AxiosResponse> {
		const { offset, dateFrom, dateTo, propertyIds } = params;

		const userId: string = store.getState().user.ownerId;

		const queryParams = {
			offset,
			limit: 10,
			status: ExpensesStatuses.ACTIVE,
			propertyIds,
		} as {
			offset: number;
			limit: number;
			"expense_date[gte]"?: string;
			"expense_date[lte]"?: string;
			status: ExpensesStatuses;
		};

		if (dateFrom) {
			queryParams["expense_date[gte]"] = dateFrom;
		}

		if (dateTo) {
			queryParams["expense_date[lte]"] = dateTo;
		}

		const query = build({
			...queryParams,
		});

		// return $http.get(`/expenses?${query}`);
		return $http.get(`users/${userId}/properties/expenses?${query}`);
	}

	public static async getExpensesByPropertyId(
		params: GetExpensesByPropertyIdReqParams
	): Promise<AxiosResponse> {
		const { offset, dateFrom, dateTo, limit, propertyIds } = params;

		const queryParams = {
			propertyIds,
			offset,
			limit: limit || 10,
			status: ExpensesStatuses.ACTIVE,
		} as {
			offset: number;
			limit: number;
			"expense_date[gte]"?: string;
			"expense_date[lte]"?: string;
			status: ExpensesStatuses;
		};

		if (dateFrom) {
			queryParams["expense_date[gte]"] = dateFrom;
		}

		if (dateTo) {
			queryParams["expense_date[lte]"] = dateTo;
		}

		const query = build({
			...queryParams,
		});

		return $http.get(`/expenses?${query}`);
	}

	public static async addExpenses(
		data: CreateExpenseReqBody
	): Promise<AxiosResponse> {
		return $http.post(`/expenses`, data);
	}

	public static async updateExpense(
		propertyID: string,
		expenseId: string,
		data: CreateExpenseReqBody
	): Promise<AxiosResponse> {
		return $http.put(`/expenses/${propertyID}/${expenseId}`, data);
	}

	public static async deleteExpense(
		propertyId: string,
		expenseId: string
	): Promise<AxiosResponse> {
		return $http.delete(`/expenses/${propertyId}/${expenseId}`);
	}
}

export default ExpensesClient;
