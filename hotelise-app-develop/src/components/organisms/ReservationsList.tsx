import styled from "styled-components";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useState } from "react";

// import { Reservation } from "models/reservations";
import { PropertyReportDataItem } from "components/molecules";
import { ListLoader, LoaderWithOverlay } from "components/atoms";

import { FONT_FAMILY_MEDIUM } from "styles/typography";
import { MAIN_THEME } from "styles/colors";

import { ReportTableItemWithTransfer } from "interfaces/reports";

// interface TableProps {
// 	columns: string;
// }

const ReportItemsTable = styled.div`
	margin-bottom: 25px;
	background: #ffffff;
	border-radius: 16px;
	/* padding: 15px; */
`;

const TableContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 1px;
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
	overflow: hidden;
	background: #f2f2f2;
`;

const TableContainer = styled.div`
	width: 100%;
	border-radius: 16px;
	display: inline-flex;
	flex-direction: column;
	overflow: hidden;
	background: #ffffff;
	position: relative;
`;

const TableHeaderItem = styled.div`
	font-size: 12px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 38px;
	color: #ffffff;
	background: linear-gradient(
		90deg,
		#666 0%,
		#666 calc(100% - 0.05em),
		#ccc calc(100% - 0.05em),
		#ccc 100%
	);
`;

const EmptyListMessageContainer = styled.div`
	background: #ffffff;
	margin: 10px 0 0;
	padding: 15px;
	border-radius: 16px;
`;

const EmptyListMessage = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
`;

const ReportTableHeader = styled.div<{ columns: string }>`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	gap: 1px;
	margin-bottom: 1px;
	border-top-right-radius: 16px;
	border-top-left-radius: 16px;
	overflow: hidden;
`;

const LoaderContainer = styled.div`
	margin-bottom: 25px;
`;

interface Props {
	isLoading: boolean;
	showProperty?: boolean;
	reservations: any[];
	onSelect: (item: ReportTableItemWithTransfer | null) => void;
}

const ReservationsList = (props: Props): JSX.Element => {
	const { showProperty, reservations, isLoading, onSelect } = props;

	const renderReportItemsTable = () => {
		const hasReservations = reservations.length > 0;
		return (
			<ReportItemsTable>
				<TableContainer>
					{isLoading ? <LoaderWithOverlay /> : null}
					{hasReservations ? (
						<>
							<ReportTableHeader
								columns={
									showProperty
										? "1fr 1fr 1fr 0.5fr 1fr 0.75fr 0.75fr 0.65fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr"
										: "1fr 1fr 0.5fr 1fr 0.75fr 0.75fr 0.65fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr "
								}
							>
								{showProperty ? (
									<TableHeaderItem>Property</TableHeaderItem>
								) : null}
								<TableHeaderItem>Channel</TableHeaderItem>
								<TableHeaderItem>Code</TableHeaderItem>
								<TableHeaderItem>Status</TableHeaderItem>
								<TableHeaderItem>Full name</TableHeaderItem>
								<TableHeaderItem>Checkin</TableHeaderItem>
								<TableHeaderItem>Checkout</TableHeaderItem>
								<TableHeaderItem>Currency</TableHeaderItem>
								<TableHeaderItem>Accommodation</TableHeaderItem>
								<TableHeaderItem>Channel Fee</TableHeaderItem>
								<TableHeaderItem>Net accomdation</TableHeaderItem>
								<TableHeaderItem>Cleaning</TableHeaderItem>
								<TableHeaderItem>Payout</TableHeaderItem>
								<TableHeaderItem>Hotelise help</TableHeaderItem>
								<TableHeaderItem>Owner income</TableHeaderItem>
								<TableHeaderItem>Transfer</TableHeaderItem>
								<TableHeaderItem>Sender</TableHeaderItem>
							</ReportTableHeader>
							<TableContent>
								{reservations.map(
									(reservation: ReportTableItemWithTransfer) => (
										<PropertyReportDataItem
											key={reservation._item.code}
											data={reservation}
											showProperty={showProperty}
											onSelect={onSelect}
										/>
									)
								)}
							</TableContent>
						</>
					) : (
						<EmptyListMessageContainer>
							<EmptyListMessage>Empty list</EmptyListMessage>
						</EmptyListMessageContainer>
					)}
				</TableContainer>
			</ReportItemsTable>
		);
	};

	return renderReportItemsTable();
};

export default ReservationsList;
