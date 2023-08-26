import dayjs from "dayjs";
import { DateFilterType, DateRangeFilter } from "interfaces/filters";

export const defaultStatementsDateFilter = {
	dateFrom: dayjs().startOf("month").toISOString(),
	dateTo: dayjs().endOf("month").toISOString(),
	dateFromType: DateFilterType.CHECKOUT_TIME,
	dateToType: DateFilterType.CHECKOUT_TIME,
} as DateRangeFilter;
