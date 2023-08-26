import styled from "styled-components";

import { LoaderWithOverlay, SummaryItem } from "components/atoms";
import { useSelector } from "react-redux";
import { getReservationsReport } from "state/modules/reservations";
import { useMemo } from "react";

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 1px;
	width: 100%;
	background: #e5e2e9;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid #e5e2e9;
	position: relative;
`;

interface Props {
	isLoading: boolean;
}

const ReservationsSummary = (props: Props) => {
	const { isLoading } = props;

	const report = useSelector(getReservationsReport);

	const summaryItems = useMemo(() => {
		if (report) {
			return [
				{
					title: "Occupancy",
					value: `${report.calculations?.occupancyRate || 0}%`,
				},
				{
					title: "Nights Sold",
					value: `${report.reportItems?.reduce((prevValue, currentValue) => {
						const { nights } = currentValue;

						return prevValue + nights;
					}, 0)}`,
				},
				{
					value: `$${
						report.calculations?.totalInCurrency.totalIncomeInCurrency || 0
					}`,
					title: "Owner Income",
				},
				{
					value: `${report.calculations?.totalInCurrency.netOwnerIncomeInCurrency}$`,
					title: "Net Income (after exp)",
				},
				// {
				// 	title: "Hotelise Fee",
				// 	value: "$3.520",
				// },
			];
		}

		return [];
	}, [report]);

	return (
		<Container>
			{summaryItems.map((item) => (
				<SummaryItem key={item.title} value={item.value} title={item.title} />
			))}
			{isLoading ? <LoaderWithOverlay /> : null}
		</Container>
	);
};

export default ReservationsSummary;
