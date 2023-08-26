import { Expense } from "interfaces/expenses";

export interface GetExpensesResponse {
	content: Array<Expense>;
	_metadata: {
		totalCount: number;
	};
}

export interface GetExpensesReqParams {
	offset: number;
	dateFrom: string | null;
	dateTo: string | null;
	propertyIds: string;
}
