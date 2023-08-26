export interface CreateExpenseReqBody {
	description?: string;
	amount?: number;
	currency?: string;
	expense_date?: string;
	propertyId?: string;
}

export enum ExpensesStatuses {
	ACTIVE = "ACTIVE",
	DISABLED = "DISABLED",
}

export interface Expense {
	name: string;
	id?: string;
	propertyId: string;
	description?: string;
	amount?: number;
	status?: ExpensesStatuses;
	expense_date?: string;
	createdAt: string;
	currency: string;
	propertyName?: string;
}
