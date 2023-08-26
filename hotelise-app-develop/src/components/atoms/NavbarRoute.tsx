import { NavRoute } from "models/routes";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { MAIN_THEME } from "styles/colors";
import Icon from "./Icon";

interface Props {
	route: NavRoute;
	isActive: boolean;
	isExpanded: boolean;
}

interface IconWrapProps {
	isExpanded: boolean;
}

const RouteBase = styled(NavLink)`
	height: 70px;
	width: 100%;
	display: flex;
	background-color: transparent;
	align-items: center;
	color: #ffffff;
	font-size: 18px;
	text-decoration: none;
	border-radius: 15px;

	&.active {
		background-color: ${MAIN_THEME.BLACK};
	}
`;

const Route = styled(RouteBase)`
	justify-content: center;
`;

const ExtendedRoute = styled(RouteBase)`
	padding: 0 30px;
`;

const IconWrap = styled.div<IconWrapProps>`
	margin-right: ${(props) => (props.isExpanded ? "30px" : 0)};
`;

const NavbarRoute = (props: Props): JSX.Element => {
	const { route, isExpanded } = props;

	const renderRouteContent = () => (
		<>
			{route.icon ? (
				<IconWrap isExpanded={isExpanded}>
					<Icon name={route.icon} size={30} color="#ffffff" />
				</IconWrap>
			) : null}
			{isExpanded ? route.title : null}
		</>
	);

	const renderRoute = () =>
		isExpanded ? (
			<ExtendedRoute key={route.to} to={route.to}>
				{renderRouteContent()}
			</ExtendedRoute>
		) : (
			<Route key={route.to} to={route.to}>
				{renderRouteContent()}
			</Route>
		);

	return renderRoute();
};

export default NavbarRoute;
