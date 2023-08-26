import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import { ButtonSize } from "interfaces/buttons";
import { IconName } from "interfaces/icons";

import { MAIN_THEME } from "styles/colors";
import Icon from "./Icon";

interface Size {
	width: string | number;
	height: string | number;
}

const getSize = (size: ButtonSize): Size => {
	switch (size) {
		case ButtonSize.FULL_WIDTH:
			return {
				width: "100%",
				height: "60px",
			};
		case ButtonSize.LG:
			return {
				width: "364px",
				height: "60px",
			};

		case ButtonSize.MD:
			return {
				width: "208px",
				height: "50px",
			};

		case ButtonSize.SM:
			return {
				width: "166px",
				height: "50px",
			};
		case ButtonSize.XS:
			return {
				width: "120px",
				height: "40px",
			};
		default:
			return {
				width: "100%",
				height: "50px",
			};
	}
};

const getBorderRadius = (size: ButtonSize): string => {
	switch (size) {
		case ButtonSize.FULL_WIDTH:
			return "52px";
		case ButtonSize.LG:
			return "52px";
		case ButtonSize.MD:
			return "15px";
		case ButtonSize.SM:
			return "15px";
		default:
			return "15px";
	}
};

interface ButtonProps {
	disabled?: boolean;
	light?: boolean;
	dark?: boolean;
	bold?: boolean;
	size: ButtonSize;
	width?: number | string;
	height?: number | string;
	borderRadius?: number | string;
}

const IconContainer = styled.div`
	margin-right: 10px;
	display: flex;
`;

const Container = styled.button<ButtonProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 100%;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: ${(props) =>
		props.borderRadius ? props.borderRadius : getBorderRadius(props.size)};
	width: ${(props) => (props.width ? props.width : getSize(props.size).width)};
	height: ${(props) =>
		props.height ? props.height : getSize(props.size).height};
	${(props) => (props.light ? "background-color: #ffffff" : "")};
	${(props) => (props.light ? `color: ${MAIN_THEME.GREY_DARK}` : "")};
	${(props) => (props.dark ? `background-color: ${MAIN_THEME.GREY_DARK}` : "")};
	${(props) => (props.dark ? `color: #ffffff` : "")};
	${(props) => (props.bold ? `font-weight: 700` : "font-weight: 400")};
`;

interface Props {
	title: string;
	disabled?: boolean;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	light?: boolean;
	dark?: boolean;
	bold?: boolean;
	isLoading?: boolean;
	width?: number | string;
	height?: number | string;
	borderRadius?: number | string;
	size: ButtonSize;
	icon?: {
		name: IconName;
		size: number;
		color: string;
	} | null;
}

const Button = (props: Props): JSX.Element => {
	const {
		title,
		onClick,
		disabled,
		type,
		light,
		dark,
		bold,
		isLoading,
		width,
		height,
		size,
		icon,
	} = props;

	const renderLoader = () => (
		<ThreeDots
			color={dark ? "#ffffff" : MAIN_THEME.GREY_DARK}
			height={20}
			width={60}
		/>
	);

	const renderIcon = () =>
		icon ? (
			<IconContainer>
				<Icon name={icon.name} size={icon.size} color={icon.color} />
			</IconContainer>
		) : null;

	return (
		<Container
			onClick={onClick}
			disabled={disabled}
			type={type || "button"}
			light={light}
			dark={dark}
			bold={bold}
			width={width}
			height={height}
			size={size}
		>
			{isLoading ? (
				renderLoader()
			) : (
				<>
					{renderIcon()}
					{title}
				</>
			)}
		</Container>
	);
};

export default Button;
