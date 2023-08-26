import styled from "styled-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { LoaderWithOverlay, SummaryItem } from "components/atoms";

import {
	getDashboardReportData,
	getDashboardReportLoading,
} from "state/modules/dashboard";
import SummaryItemThreeValues from "../atoms/SummaryItemThreeValues";

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 3px;
	width: 100%;
	border: 1px solid #e5e2e9;
	border-radius: 3px;
	overflow: hidden;
	position: relative;
	background: #d7d7d7;
`;

const DashboardSummary = () => {
	const report = useSelector(getDashboardReportData);
	const isLoading = useSelector(getDashboardReportLoading);

	const summaryItems = useMemo(() => {
		if (report) {
			return [
				{
					title: "Owner Payouts",
					value: `${report.calculations?.totalInCurrency.totalIncomeInCurrency}$`,
					value1: `${report.calculations?.totalIncomePerCurrency?.AMD}֏`,
					value2: `${report.calculations?.totalIncomePerCurrency.USD}$`,
				},
				{
					title: "Owner Net Income",
					value: `${report.calculations?.totalInCurrency.netOwnerIncomeInCurrency}$`,
				},
				{
					title: "Expenses",
					value: `${report.calculations?.totalInCurrency.totalExpensesInCurrency}$`,
					value1: `${report.calculations?.totalExpensesPerCurrency?.AMD}֏`,
					value2: `${report.calculations?.totalExpensesPerCurrency.USD}$`,
				},
				{
					title: "Reservations",
					value: `${
						report.calculations?.reservationPeriod.numberOfReservations || 0
					}`,
				},
				{
					title: "Cleaning",
					value: `${
						report.calculations?.totalInCurrency?.totalCleaningInCurrency || 0
					}$`,
					value1: `${report.calculations?.totalCleaningPerCurrency?.AMD}֏`,
					value2: `${report.calculations?.totalCleaningPerCurrency?.USD}$`,
				},
				{
					title: "Occupancy Rate",
					value: `${report.calculations?.occupancyRate}%`,
				},
				{
					title: "ADR",
					value: `${report.calculations?.totalInCurrency?.adr || 0}$`,
				},
				{
					title: "RevPAR",
					value: `${report.calculations?.totalInCurrency?.revPar || 0}$`,
				},
				{
					title: "ALOS",
					value: `${report.calculations?.alos}days`,
				},
				{
					title: "N/A",
					value: ``,
				},
			];
		}

		return [];
	}, [report]);

	return (
		<Container>
			{summaryItems.map((item) =>
				item.value1 && item.value2 ? (
					<SummaryItemThreeValues
						key={item.title}
						value={item.value}
						title={item.title}
						value1={item.value1}
						value2={item.value2}
					/>
				) : (
					<SummaryItem key={item.title} value={item.value} title={item.title} />
				)
			)}
			{isLoading ? <LoaderWithOverlay /> : null}
		</Container>
	);
};

export default DashboardSummary;
