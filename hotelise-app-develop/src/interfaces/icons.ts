export enum IconName {
	USER,
	PASSWORD,
	EYE,
	CLOSED_EYE,
	NAVBAR_TOGGLER,
	PROPERTY,
	RESERVATION,
	OWNER,
	LOGOUT,
	PLUS,
	CLOSE,
	EDIT,
	EMAIL,
	PHONE,
	FILTER,
	SEARCH,
	LOCATION,
	NAME,
	CHECK,
	TRASH,
	SETTINGS,
	LOGO,
	CLAIMS,
	DASHBOARD,
	EXPENSES,
	STATEMENTS,
}

export interface IconProps {
	size?: number; // icon height in pixels
	color?: string; // any valid color string (rgb, hex, etc)
	secondColor?: string; // any valid color string (rgb, hex, etc)
}

export interface NamedIconProps extends IconProps {
	name: IconName;
}
