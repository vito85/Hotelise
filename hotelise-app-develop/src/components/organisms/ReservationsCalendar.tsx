/* eslint-disable react/no-unstable-nested-components */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	Appointments,
	MonthView,
	DateNavigator,
	Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import PropertiesClient from "services/api/properties";
import ReportsClient from "services/api/reports";

import { CHANNEL_NAMES } from "interfaces/channels";

import { Property } from "models/properties";
import { defaultReservationsDateFilter } from "utils/reservations";
import { GenerateReportResponse } from "models/reports";
import { LoaderWithOverlay } from "components/atoms";
import { PropertySelect } from "components/molecules";
import ReservationDetailsPanel from "./ReservationDetailsPanel";

const FilterContainer = styled.div`
	position: relative;
	z-index: 11;
	margin-bottom: 25px;
`;

const CalendarContainer = styled.div`
	position: relative;
	background: #fff;
	border-radius: 8px;
	overflow: hidden;
`;

const Container = styled.div`
	position: relative;
`;

const SchedulerFork = Scheduler as any;
// const AppointmentsFork = Appointments as any;

const theme = createTheme({ palette: { type: "light", primary: blue } });

const ReservationsCalendar = () => {
	const [properties, setProperties] = useState<any[]>([]);
	const [events, setEvents] = useState<any[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [selectedProperty, setSelectedProperty] = useState<any>(null);
	const [selectedReservation, setSelectedReservation] = useState<any | null>(
		null
	);

	const onPageLoading = useCallback(
		async (date: Date | string, propertyId?: string) => {
			setLoading(true);
			setEvents([]);

			const dateFrom = dayjs(date).startOf("month").toISOString();
			const dateTo = dayjs(date).endOf("month").toISOString();

			try {
				const propertiesRes = (await PropertiesClient.getProperties({
					offset: 0,
					city: "",
					name: "",
				})) as AxiosResponse;

				const propertiesList = propertiesRes.data.content as Property[];

				if (propertiesList.length) {
					setProperties(propertiesList);
					const propertyIds = propertiesList.map((item) => item.id);
					const propertyIdsString = propertyIds.join(",");

					const propertiesMap = {} as {
						[n: string]: Property;
					};

					propertiesList.forEach((property) => {
						propertiesMap[property.id] = property;
					});

					const reportsRes = (await ReportsClient.generateReport({
						propertyIds:
							propertyId || selectedProperty?.value || propertyIdsString,
						dateFrom,
						dateTo,
						dateFromType: defaultReservationsDateFilter.dateFromType,
						dateToType: defaultReservationsDateFilter.dateToType,
					})) as AxiosResponse<GenerateReportResponse>;

					const transformedReservations =
						reportsRes.data.content.calculations.allAccountTransfers.map(
							(item) => ({
								...item,
								property: propertiesMap[item._item.propertyId] || "",
							})
						);

					const updatedEvents = transformedReservations.map((reservation) => {
						const nameWithoutDash = (
							reservation?.property?.name || ""
						).replaceAll("-", " ");
						const nameWithoutUnderscore = nameWithoutDash.replaceAll("_", " ");

						let color = "rgb(255, 121, 38)";

						switch (reservation._item.channel) {
							case CHANNEL_NAMES.AIRBNB_OFFICIAL:
							case CHANNEL_NAMES.AIRBNB:
								color = "#FF385C";

								break;
							case CHANNEL_NAMES.BOOKING:
								color = "#02357F";

								break;
							default:
								color = "rgb(255, 121, 38)";

								break;
						}

						// ${nameWithoutUnderscore.slice(1)} ё${nameWithoutUnderscore
						// 	.charAt(0)
						// 	.toUpperCase()`}
						return {
							id: reservation._item.channel,
							title: `${reservation._item.guest.first_name} ${reservation._item.guest.last_name}`,
							startDate: reservation._item.start_date,
							endDate: reservation._item.end_date,
							color,
							reservation,
							channel: reservation._item.channel,
						};
					});

					setEvents(updatedEvents);
					setLoading(false);
				}
			} catch (error) {
				console.log({ error });
				setLoading(false);
			}
		},
		[selectedProperty]
	);

	useEffect(() => {
		onPageLoading(dayjs().toISOString());
	}, []);

	const transformedProperties = useMemo(
		() =>
			properties.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		[properties]
	);

	const handleSelectReservation = (item: any | null) => {
		setSelectedReservation(item);
	};

	const handleCloseDetailsPanel = () => {
		setSelectedReservation(null);
	};

	const handleSelectProperty = (property: any) => {
		setSelectedProperty(property);

		onPageLoading(dayjs().toISOString(), property?.value);
	};

	const Appointment = ({ children, style, data, ...restProps }: any) => {
		return (
			<Appointments.Appointment
				{...restProps}
				onClick={() => handleSelectReservation(data.reservation)}
				style={{
					...style,
					backgroundColor: data.color,
					borderRadius: "8px",
				}}
			>
				{children}
			</Appointments.Appointment>
		);
	};

	// const AppointmentContent = (compProps: any) => {
	// 	const { data } = compProps;
	// 	const { color } = data;

	// 	return (
	// 		<Appointments.AppointmentContent
	// 			{...compProps}
	// 			style={{
	// 				width: "100%",
	// 				height: "100%",
	// 				backgroundColor: color,
	// 			}}
	// 		/>
	// 	);
	// };

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
					guest={selectedReservation._item.guest}
				/>
			);
		}
	};

	return (
		<Container>
			<FilterContainer>
				<PropertySelect
					properties={transformedProperties}
					selectedProperty={selectedProperty}
					onSelect={handleSelectProperty}
				/>
			</FilterContainer>
			<CalendarContainer>
				<MuiThemeProvider theme={theme}>
					<SchedulerFork
						data={events}
						style={{
							background: "#fff",
						}}
					>
						<ViewState onCurrentDateChange={onPageLoading} />
						<Toolbar />
						<DateNavigator />
						<MonthView />
						<Appointments
							appointmentComponent={Appointment}
							// appointmentContentComponent={AppointmentContent}
						/>
						{/* <AppointmentTooltip
							headerComponent={Header}
							contentComponent={Content}
							commandButtonComponent={CommandButton}
							showCloseButton
						/> */}
					</SchedulerFork>
				</MuiThemeProvider>
				{isLoading ? <LoaderWithOverlay /> : null}
			</CalendarContainer>
			{renderReservationsDetailsPanel()}
		</Container>
	);
};

export default ReservationsCalendar;
