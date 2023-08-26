import dayjs from "dayjs";
import {
	DateFilterType,
	DateRangeFilter,
	StatementsFilter,
} from "interfaces/filters";
import { PropertyTab, PropertyTabValue } from "interfaces/properties";

export const propertyContentTabs = [
	{
		title: "Reservations",
		value: PropertyTabValue.RESERVATIONS,
	},
	{
		title: "Expenses",
		value: PropertyTabValue.EXPENSES,
	},
	{
		title: "Statements",
		value: PropertyTabValue.STATEMENTS,
	},
] as Array<PropertyTab>;

export const defaultPropertyDetailsFilters = {
	dateFrom: dayjs().startOf("month").toISOString(),
	dateTo: dayjs().endOf("month").toISOString(),
	dateFromType: DateFilterType.CHECKOUT_TIME,
	dateToType: DateFilterType.CHECKOUT_TIME,
} as DateRangeFilter;

export const defaultPropertyReportFilter = {
	dateFrom: dayjs().startOf("month").toISOString(),
	dateTo: dayjs().endOf("month").toISOString(),
	dateFromType: DateFilterType.CHECKOUT_TIME,
	dateToType: DateFilterType.CHECKOUT_TIME,
} as DateRangeFilter;

export const defaultPropertyStatementsFilter = {
	month: dayjs().month(),
	year: dayjs().year(),
} as StatementsFilter;
