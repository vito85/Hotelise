import { IconName } from "interfaces/icons";

export interface NavRoute {
	to: string;
	title: string;
	icon?: IconName;
}
