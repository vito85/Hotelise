import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { Icon, Image, NavbarRoute, LogOutButton } from "components/atoms";

import { NavRoute } from "models/routes";
import { IconName } from "interfaces/icons";

import { navRoutes } from "utils/routes";

import { SIZES } from "styles/size";
import { MAIN_THEME } from "styles/colors";

import logoSm from "assets/images/logoSm.svg";
import logo from "assets/images/logo.svg";

interface Props {
	isExpanded: boolean;
	toggle: () => void;
}
interface ContainerProps {
	expanded: boolean;
}

interface TogglerProps {
	expanded: boolean;
}

const Container = styled.div<ContainerProps>`
	height: 100vh;
	width: ${(props) =>
		props.expanded
			? `${SIZES.EXPANDED_NAVBAR_WIDTH}px`
			: `${SIZES.NAVBAR_WIDTH}px`};
	padding: 70px 10px 10px;
	background-color: ${MAIN_THEME.GREY_DARK};
	z-index: 1;
	transition: width 0.25s ease;
	position: relative;
	display: flex;
	flex-direction: column;

	@media only screen and (max-height: 860px) {
		padding: 45px 10px 10px;
	}
`;

const Toggler = styled.button<TogglerProps>`
	width: 45px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	border: none;
	outline: none;
	position: absolute;
	right: 0;
	top: 65%;
	transform: ${(props) =>
		props.expanded ? "translateY(-65%)" : "translateY(-65%) rotate(180deg)"};
	cursor: pointer;
`;

const LogoWrap = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 8vh;
	height: 44px;

	@media only screen and (max-height: 860px) {
		margin-bottom: 5vh;
	}
`;

const LogOutButtonWrap = styled.div`
	margin-top: auto;
	width: 100%;
`;

const Navbar = (props: Props): JSX.Element => {
	const location = useLocation();

	const { isExpanded, toggle } = props;

	const renderRoutes = () =>
		navRoutes.map((route: NavRoute) => {
			const isActive = location.pathname === route.to;

			return (
				<NavbarRoute
					route={route}
					key={route.to}
					isActive={isActive}
					isExpanded={isExpanded}
				/>
			);
		});

	return (
		<Container expanded={isExpanded}>
			<LogoWrap>
				<Image
					src={isExpanded ? logo : logoSm}
					width={
						isExpanded
							? SIZES.EXPANDED_NAVBAR_LOGO_WIDTH
							: SIZES.NAVBAR_LOGO_WIDTH
					}
				/>
			</LogoWrap>
			<Toggler onClick={toggle} expanded={isExpanded}>
				<Icon name={IconName.NAVBAR_TOGGLER} color="#ffffff" size={36} />
			</Toggler>
			{renderRoutes()}
			<LogOutButtonWrap>
				<LogOutButton isExpanded={isExpanded} />
			</LogOutButtonWrap>
		</Container>
	);
};

export default Navbar;
