import { IconName } from "interfaces/icons";
import { NavRoute } from "models/routes";

export const navRoutes = [
	{
		to: "/",
		title: "Dashboard",
		icon: IconName.DASHBOARD,
	},
	{
		to: "/properties",
		title: "Properties",
		icon: IconName.PROPERTY,
	},
	{
		to: "/statements",
		title: "Statements",
		icon: IconName.STATEMENTS,
	},
	{
		to: "/reservations",
		title: "Reservations",
		icon: IconName.RESERVATION,
	},
	{
		to: "/expenses",
		title: "Expenses",
		icon: IconName.EXPENSES,
	},
] as Array<NavRoute>;
