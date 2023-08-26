import dayjs from "dayjs";
import { CalendarRange } from "interfaces/calendar";

export const defaultCalendarRange = {
	dateFrom: dayjs().startOf("month").toISOString(),
	dateTo: dayjs().endOf("month").toISOString(),
} as CalendarRange;
