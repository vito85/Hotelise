import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { DashboardFilter, DashboardIncomeChart } from "components/organisms";
import { DashboardSummary, OccupancyChart } from "components/molecules";

import {
	getDashboardReport,
	getDashboardYearReport,
	getDashboardYearReportLoading,
} from "state/modules/dashboard";

import { FONT_FAMILY_BOLD, FONT_WEIGHT_BOLD } from "styles/typography";
import { MAIN_THEME } from "styles/colors";

const FilterContainer = styled.div`
	position: relative;
	z-index: 11;
`;

const SummaryContainer = styled.div`
	margin-bottom: 20px;
	z-index: 0;
`;

const Container = styled.div`
	width: 100%;
	padding: 20px 30px;
	overflow: auto;
`;

const ChartsContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: calc(100% - 295px) 280px;
	gap: 15px;
	height: 600px;
`;

const Title = styled.p`
	font-size: 26px;
	font-family: ${FONT_FAMILY_BOLD};
	font-weight: ${FONT_WEIGHT_BOLD};
	color: ${MAIN_THEME.GREY_DARK};
	padding: 20px 0;
`;

const Dashboard = () => {
	const dispatch = useDispatch();

	const isYearReportLoading = useSelector(getDashboardYearReportLoading);

	useEffect(() => {
		dispatch(getDashboardReport());
		dispatch(getDashboardYearReport());
	}, [dispatch]);

	return (
		<Container>
			<Title>Dashboard</Title>
			<FilterContainer>
				<DashboardFilter />
			</FilterContainer>
			<SummaryContainer>
				<DashboardSummary />
			</SummaryContainer>
			<ChartsContainer>
				<DashboardIncomeChart isLoading={isYearReportLoading} />
				<OccupancyChart isLoading={isYearReportLoading} />
			</ChartsContainer>
		</Container>
	);
};

export default Dashboard;
