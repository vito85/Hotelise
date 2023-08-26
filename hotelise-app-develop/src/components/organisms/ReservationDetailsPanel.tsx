import styled from "styled-components";
import dayjs from "dayjs";

import { CloseButton, Image } from "components/atoms";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_BOLD } from "styles/typography";
import { useMemo } from "react";
import { ReservationGuest } from "models/reservations";

const InfoCategoryContainer = styled.div`
	margin-bottom: 25px;
`;

const InfoRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 10px;
	margin-bottom: 15px;

	> p:nth-child(2) {
		text-align: right;
	}
`;

const MainInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 5px;
	margin-bottom: 25px;
`;

const PropertyContainer = styled.div``;

const InfoTitle = styled.p`
	color: #ffffff;
`;

const InfoValue = styled.p`
	color: #ffffff;
`;

const InfoCategoryTitle = styled.p`
	font-size: 20px;
	color: #ffffff;
	margin-bottom: 15px;
`;

const InfoColumn = styled.div`
	text-align: center;

	> p:first-child {
		margin-bottom: 10px;
	}
`;

const ImageContainer = styled.div`
	margin-bottom: 15px;
`;

const TopContainer = styled.div`
	padding-top: 15px;
	margin-bottom: 25px;
`;

const DetailsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 25px;
	margin-bottom: 25px;
`;

const Container = styled.div`
	background: ${MAIN_THEME.GREY_DARK};
	box-shadow: -6px -1px 15px rgba(0, 0, 0, 0.25);
	height: 100vh;
	width: 490px;
	position: fixed;
	top: 0;
	right: 0;
	padding: 15px 50px;
	z-index: 10;
	overflow-y: scroll;
`;

const Title = styled.p`
	font-family: ${FONT_FAMILY_BOLD};
	text-transform: capitalize;
	font-size: 32px;
	margin-bottom: 15px;
	color: #ffffff;
	text-align: center;
`;

const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: #fff;
	margin: 10px 0;
`;

interface Props {
	close: () => void;
	hostServiceFee: string;
	ownerIncome: string;
	hoteliseHelp: string;
	payoutPrice: string;
	propertyName: string;
	propertyAddress: string;
	checkIn: string;
	checkOut: string;
	nights: string | number;
	guestsNumber: number;
	image: string;
	currency: string;
	guest?: ReservationGuest;
}

const ReservationDetailsPanel = (props: Props): JSX.Element => {
	const {
		close,
		hostServiceFee,
		ownerIncome,
		hoteliseHelp,
		payoutPrice,
		propertyName,
		propertyAddress,
		checkIn,
		checkOut,
		nights,
		guestsNumber,
		image,
		currency,
		guest,
	} = props;

	const renderProperty = () => {
		return (
			<PropertyContainer>
				<ImageContainer>
					<Image src={image} borderRadius={15} />
				</ImageContainer>
			</PropertyContainer>
		);
	};

	const rederMainInfo = () => {
		return (
			<MainInfo>
				<InfoColumn>
					<InfoTitle>Check In</InfoTitle>
					<InfoValue>{dayjs(checkIn).format("DD/MM/YYYY")}</InfoValue>
				</InfoColumn>
				<InfoColumn>
					<InfoTitle>Check Out</InfoTitle>
					<InfoValue>{dayjs(checkOut).format("DD/MM/YYYY")}</InfoValue>
				</InfoColumn>
				<InfoColumn>
					<InfoTitle>Nights</InfoTitle>
					<InfoValue>{nights}</InfoValue>
				</InfoColumn>
				{guestsNumber ? (
					<InfoColumn>
						<InfoTitle>Guests</InfoTitle>
						<InfoValue>{guestsNumber}</InfoValue>
					</InfoColumn>
				) : null}
			</MainInfo>
		);
	};

	const renderPropertyDetails = () => {
		return (
			<InfoCategoryContainer>
				<InfoCategoryTitle>Property Details</InfoCategoryTitle>
				<InfoRow>
					<InfoTitle>Title</InfoTitle>
					<InfoValue>{propertyName}</InfoValue>
				</InfoRow>
				<InfoRow>
					<InfoTitle>Address</InfoTitle>
					<InfoValue>{propertyAddress}</InfoValue>
				</InfoRow>
			</InfoCategoryContainer>
		);
	};

	const currencySymbol = useMemo(() => {
		switch (currency) {
			case "AMD":
				return "֏";
			case "USD":
				return "$";

			default:
				return "";
		}
	}, [currency]);

	const renderPaymentDetails = () => {
		return (
			<InfoCategoryContainer>
				<InfoCategoryTitle>Payment Details</InfoCategoryTitle>
				<InfoRow>
					<InfoTitle>Payout</InfoTitle>
					<InfoValue>
						{currencySymbol}
						{payoutPrice}
					</InfoValue>
				</InfoRow>
				<Divider />
				<InfoRow>
					<InfoTitle>Hotelise Help</InfoTitle>
					<InfoValue>
						{currencySymbol}
						{hoteliseHelp}
					</InfoValue>
				</InfoRow>
				<InfoRow>
					<InfoTitle>Host Service Fee</InfoTitle>
					<InfoValue>
						{currencySymbol}
						{hostServiceFee}
					</InfoValue>
				</InfoRow>
				<Divider />
				<InfoRow>
					<InfoTitle>Owner Income</InfoTitle>
					<InfoValue>
						{currencySymbol}
						{ownerIncome}
					</InfoValue>
				</InfoRow>
			</InfoCategoryContainer>
		);
	};

	const renderGuest = () => {
		return (
			<InfoCategoryContainer>
				<InfoCategoryTitle>Guest Info</InfoCategoryTitle>
				<InfoRow>
					<InfoTitle>Full Name</InfoTitle>
					<InfoValue>{`${guest?.first_name} ${guest?.last_name}`}</InfoValue>
				</InfoRow>
			</InfoCategoryContainer>
		);
	};

	return (
		<Container>
			<TopContainer>
				<Title>Reservation Details</Title>
			</TopContainer>
			{renderProperty()}
			{rederMainInfo()}
			{guest ? renderGuest() : null}
			{renderPropertyDetails()}
			{renderPaymentDetails()}
			<CloseButton onClick={close} />
		</Container>
	);
};

export default ReservationDetailsPanel;
