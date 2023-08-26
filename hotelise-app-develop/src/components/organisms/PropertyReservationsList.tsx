import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo, useState } from "react";

import { ReservationTableItem } from "components/molecules";
import { ListLoader } from "components/atoms";

import { Reservation } from "models/reservations";

import {
	getPropertyReservations,
	getPropertyReservationsCount,
	getPropertyReservationsList,
	getPropertyReservationsLoading,
	// getPropertyReservationsTotal,
} from "state/modules/properties";

import { FONT_FAMILY_MEDIUM } from "styles/typography";
import { MAIN_THEME } from "styles/colors";
import { Property } from "models/properties";
import { ReportTableItemWithTransfer } from "interfaces/reports";
import ReservationDetailsPanel from "./ReservationDetailsPanel";
import ReservationsList from "./ReservationsList";

interface TableProps {
	columns: string;
}

const Table = styled.div`
	padding: 15px 20px;
`;

const TableHeader = styled.div<TableProps>`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	gap: 1px;
	margin-bottom: 1px;
	border-top-right-radius: 16px;
	border-top-left-radius: 16px;
	overflow: hidden;
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

// const ReservationsList = styled(InfiniteScroll as any)`
// 	display: grid;
// 	width: 100%;
// 	grid-template-columns: 1fr;
// 	gap: 1px;
// `;

const EmptyListMessageContainer = styled.div`
	background: #ffffff;
	margin: 0 20px;
	padding: 15px;
	border-radius: 16px;
`;

const EmptyListMessage = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
`;

interface Props {
	propertyDetails: Property;
}

const PropertyReservationsList = (props: Props): JSX.Element => {
	const [selectedReservation, setSelectedReservation] =
		useState<ReportTableItemWithTransfer | null>(null);

	const { propertyDetails } = props;

	const propertyReservations = useSelector(getPropertyReservationsList);
	// const propertyReservationsTotal = useSelector(getPropertyReservationsTotal);
	// const propertyReservationsCount = useSelector(getPropertyReservationsCount);
	const isPropertyReservationsLoading = useSelector(
		getPropertyReservationsLoading
	);

	const dispatch = useDispatch();

	// const hasMore = useMemo(
	// 	() => propertyReservationsCount < propertyReservationsTotal,
	// 	[propertyReservationsCount, propertyReservationsTotal]
	// );

	// const loadMore = () => {
	// 	if (!isPropertyReservationsLoading) {
	// 		dispatch(getPropertyReservations(propertyDetails.id, true));
	// 	}
	// };

	const handleCloseDetailsPanel = () => {
		setSelectedReservation(null);
	};

	const handleSelectReservation = (
		reservation: ReportTableItemWithTransfer | null
	) => {
		setSelectedReservation(reservation);
	};

	const renderEmptyListMessage = () => (
		<EmptyListMessageContainer>
			<EmptyListMessage>Empty list</EmptyListMessage>
		</EmptyListMessageContainer>
	);

	const renderReservationDetails = () => {
		if (selectedReservation) {
			return (
				<ReservationDetailsPanel
					close={handleCloseDetailsPanel}
					hostServiceFee={`${selectedReservation._item.host_service_fee}`}
					ownerIncome={`${selectedReservation._item.owner_income}`}
					hoteliseHelp={`${selectedReservation._item.hotelise_help}`}
					payoutPrice={`${selectedReservation._item.payout_price}`}
					propertyName={propertyDetails.name || ""}
					currency={selectedReservation._item.currency}
					propertyAddress={propertyDetails?.address?.display || ""}
					checkIn={selectedReservation._item.start_date}
					checkOut={selectedReservation._item.end_date}
					nights={selectedReservation._item.nights}
					guestsNumber={1}
					image={propertyDetails.picture || ""}
				/>
			);
		}
	};

	return !isPropertyReservationsLoading && !propertyReservations.length ? (
		renderEmptyListMessage()
	) : (
		<Table>
			<ReservationsList
				reservations={propertyReservations}
				isLoading={isPropertyReservationsLoading}
				onSelect={handleSelectReservation}
			/>
			{renderReservationDetails()}
		</Table>
	);
};

export default PropertyReservationsList;
