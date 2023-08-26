import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PropertiesPage from "components/pages/PropertiesPage";
import PropertyDetailsPage from "components/pages/PropertyDetailsPage";
import StatementsPage from "components/pages/StatementsPage";
import Dashboard from "components/pages/Dashboard";
import ReservationsPage from "components/pages/ReservationsPage";
import ExpensesPage from "components/pages/ExpensesPage";

import { AppFlowContainer } from "components/atoms";

import { Navbar } from "components/molecules";

import { SIZES } from "styles/size";
import { getUser, getUserData } from "state/modules/user";

interface ContainerProps {
	isNavbarExpanded: boolean;
}

const Container = styled.div<ContainerProps>`
	display: flex;
	width: ${(props) =>
		props.isNavbarExpanded
			? `calc(100% - ${SIZES.EXPANDED_NAVBAR_WIDTH}px)`
			: `calc(100% - ${SIZES.NAVBAR_WIDTH}px)`};
	transition: width 0.25s ease;
`;

const AppFlow = (): JSX.Element => {
	const [isNavbarExpanded, setNavbarExpanded] = useState(false);

	const dispatch = useDispatch();

	const user = useSelector(getUserData);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const toggleNavbar = () => setNavbarExpanded(!isNavbarExpanded);

	return (
		<AppFlowContainer>
			<Navbar isExpanded={isNavbarExpanded} toggle={toggleNavbar} />
			<Container isNavbarExpanded={isNavbarExpanded}>
				{user ? (
					<Routes>
						<Route
							// path="/"
							index
							element={<Dashboard />}
						/>
						<Route path="properties" element={<PropertiesPage />} />
						<Route path="properties/:id" element={<PropertyDetailsPage />} />
						<Route path="statements" element={<StatementsPage />} />
						<Route path="reservations" element={<ReservationsPage />} />
						<Route path="expenses" element={<ExpensesPage />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				) : null}
			</Container>
		</AppFlowContainer>
	);
};

export default AppFlow;
