import { CSSProperties } from "react";
import { MAIN_THEME } from "styles/colors";

export const selectComponentStyles = {
	container: (containerStyles: CSSProperties) => ({
		...containerStyles,
		width: "100%",
		backgroundColor: MAIN_THEME.GREY_LIGHT,
		height: 60,
		borderRadius: 55,
		paddingLeft: 16,
		paddingRight: 16,
	}),
	control: (selectStyles: CSSProperties) => ({
		...selectStyles,
		border: "none",
		borderRadius: 12,
		borderWidth: 0,
		background: "transparent",
		padding: 0,
		outline: "none",
		height: "100%",

		hover: {
			border: "none",
		},
	}),
	input: (inputStyles: CSSProperties) => ({
		...inputStyles,
		border: "none",
		padding: "5px 0",
		color: "#ffffff",
	}),
	singleValue: (singleValueStyles: CSSProperties) => ({
		...singleValueStyles,
		color: "#ffffff",
	}),
	placeholder: (placeholderStyles: CSSProperties) => ({
		...placeholderStyles,
		color: "#ffffff",
	}),
	menu: (menuStyles: CSSProperties) => ({
		...menuStyles,
		width: "100%",
		left: 0,
	}),
} as any;
