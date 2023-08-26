/* eslint-disable import/extensions */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";

import {
	ComplexFilterPanel,
	ReservationsCalendar,
	ReservationsList,
	ReservationDetailsPanel,
} from "components/organisms";
import { ReservationsSummary } from "components/molecules";

import {
	getReservations,
	getReservationsFilter,
	getReservationsList,
	getReservationsLoading,
	setReservationsFilter,
} from "state/modules/reservations";

import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";
import { ReportTableItemWithTransfer } from "interfaces/reports";

import { defaultReservationsDateFilter } from "utils/reservations";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_BOLD, FONT_WEIGHT_BOLD } from "styles/typography";

const Title = styled.p`
	font-size: 26px;
	font-family: ${FONT_FAMILY_BOLD};
	font-weight: ${FONT_WEIGHT_BOLD};
	color: ${MAIN_THEME.GREY_DARK};
	padding: 20px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
	background: ${(props) => (props.isActive ? MAIN_THEME.BLACK : "#fff")};
	color: ${(props) => (props.isActive ? "#fff" : MAIN_THEME.BLACK)};
	border: 1px solid #e5e2e9;
	height: 25px;
	width: 100px;
	border-radius: 4px;
	cursor: pointer;
	margin-right: 10px;
`;

const FiltersContainer = styled.div`
	margin-bottom: 15px;
	z-index: 10;
	position: relative;
	padding: 0 20px;
`;

const CalendarContainer = styled.div`
	padding: 0 20px;
	margin-bottom: 15px;
	/* background: #fff; */
`;

const TableContainer = styled.div`
	padding: 20px;
`;

const ReservationsSummaryContainer = styled.div`
	padding: 20px;
`;

const Tabs = styled.div`
	padding: 20px;
`;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	overflow: auto;
	position: relative;
	overflow-y: auto;
`;

const filterOptions = [
	ComplexFilterType.CHANNEL,
	ComplexFilterType.DATE,
	ComplexFilterType.PROPERTY_ID,
	ComplexFilterType.STATUS,
];

enum Tab {
	TABLE,
	CALENDAR,
}

const ReservationsPage = (): JSX.Element => {
	const [tab, setTab] = useState(Tab.TABLE);
	const [selectedReservation, setSelectedReservation] =
		useState<ReportTableItemWithTransfer | null>(null);

	const dispatch = useDispatch();

	const filters = useSelector(getReservationsFilter);
	const reservations = useSelector(getReservationsList);
	const isLoading = useSelector(getReservationsLoading);

	useEffect(() => {
		dispatch(getReservations());
	}, [dispatch]);

	const handleChangeFilter = (updatedFilter: ComplexFilterItem) => {
		const updatedFilters = filters.map((filter: ComplexFilterItem) => {
			if (filter.type === updatedFilter.type) {
				return updatedFilter;
			}

			return filter;
		});

		dispatch(setReservationsFilter(updatedFilters));
		dispatch(getReservations());
	};

	const handleCreateFilter = (filter: ComplexFilterItem) => {
		const updatedFilters = [...filters, filter];

		dispatch(setReservationsFilter(updatedFilters));
	};

	const handleDeleteFilter = (selectedfilter: ComplexFilterItem) => {
		const updatedFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type !== selectedfilter.type
		);

		dispatch(setReservationsFilter(updatedFilters));
		dispatch(getReservations());
	};

	const handleClearFilter = () => {
		const filteredFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type === ComplexFilterType.DATE
		);

		const updatedFilters = filteredFilters.map((item) => ({
			type: ComplexFilterType.DATE,
			value: {
				...defaultReservationsDateFilter,
			},
		})) as ComplexFilterItem[];

		dispatch(setReservationsFilter(updatedFilters));
		dispatch(getReservations());
	};

	const handleSelectReservation = (
		item: ReportTableItemWithTransfer | null
	) => {
		setSelectedReservation(item);
	};

	const handleCloseDetailsPanel = () => {
		setSelectedReservation(null);
	};

	const renderContent = () => {
		if (tab === Tab.TABLE) {
			return (
				<>
					<FiltersContainer>
						<ComplexFilterPanel
							filters={filters}
							onChange={handleChangeFilter}
							onCreate={handleCreateFilter}
							onDelete={handleDeleteFilter}
							onClear={handleClearFilter}
							searchPlaceholder="Search for reservations code, first name, last name, phone, email"
							options={filterOptions}
						/>
					</FiltersContainer>
					<ReservationsSummaryContainer>
						<ReservationsSummary isLoading={isLoading} />
					</ReservationsSummaryContainer>
					<TableContainer>
						<ReservationsList
							showProperty
							reservations={reservations}
							isLoading={isLoading}
							onSelect={handleSelectReservation}
						/>
					</TableContainer>
				</>
			);
		}
		return (
			<CalendarContainer>
				<ReservationsCalendar />
				{/* <FullCalendar
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					events={[
						{
							id: 
							start: dayjs().startOf("month").toISOString(),
							end: dayjs().endOf("month").toISOString(),
							title: "Test",
							allDay: true,
							interactive: true,
						},
					]}
					// themeSystem="bootstrap"
					// views={{
					// 	dayGrid: {
					// 		// options apply to dayGridMonth, dayGridWeek, and dayGridDay views
					// 	},
					// 	timeGrid: {
					// 		// options apply to timeGridWeek and timeGridDay views
					// 	},
					// 	week: {
					// 		// options apply to dayGridWeek and timeGridWeek views
					// 	},
					// 	day: {
					// 		// options apply to dayGridDay and timeGridDay views
					// 	},
					// }}
				/> */}
			</CalendarContainer>
		);
	};

	const renderReservationsDetailsPanel = () => {
		if (selectedReservation) {
			return (
				<ReservationDetailsPanel
					close={handleCloseDetailsPanel}
					hostServiceFee={`${selectedReservation._item.host_service_fee}`}
					ownerIncome={`${selectedReservation._item.owner_income}`}
					hoteliseHelp={`${selectedReservation._item.hotelise_help}`}
					payoutPrice={`${selectedReservation._item.payout_price}`}
					currency={selectedReservation._item.currency}
					propertyName={selectedReservation.property?.name || ""}
					propertyAddress={selectedReservation.property?.address?.display || ""}
					checkIn={selectedReservation._item.start_date}
					checkOut={selectedReservation._item.end_date}
					nights={selectedReservation._item.nights}
					guestsNumber={0}
					image={selectedReservation.property?.picture || ""}
				/>
			);
		}
	};

	return (
		<Container id="reservationsListContainer">
			<Title>Reservations</Title>
			<Tabs>
				<TabButton
					onClick={() => setTab(Tab.TABLE)}
					isActive={tab === Tab.TABLE}
				>
					Table
				</TabButton>
				<TabButton
					onClick={() => setTab(Tab.CALENDAR)}
					isActive={tab === Tab.CALENDAR}
				>
					Calendar
				</TabButton>
			</Tabs>
			{renderContent()}
			{renderReservationsDetailsPanel()}
		</Container>
	);
};

export default ReservationsPage;
