import { DateFilterType } from "interfaces/filters";

export const dateFilterTypes = [
	{
		value: DateFilterType.CHECKIN_TIME,
		label: "Checkin",
	},
	{
		value: DateFilterType.CHECKOUT_TIME,
		label: "Checkout",
	},
];
