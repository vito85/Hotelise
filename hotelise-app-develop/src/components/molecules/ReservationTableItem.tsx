import styled from "styled-components";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Icon } from "components/atoms";

import { IconName } from "interfaces/icons";
import { CurrencyValue } from "interfaces/currency";

import { Reservation } from "models/reservations";

import { FONT_FAMILY_MEDIUM } from "styles/typography";
import { ACCEPT_COLOR, CANCEL_COLOR, MAIN_THEME } from "styles/colors";

interface InfoValueProps {
	color?: string;
	size?: number;
	offsetBottom?: number;
}

const InfoValue = styled.p<InfoValueProps>`
	font-family: ${FONT_FAMILY_MEDIUM};
	font-size: ${(props) => props.size || 14}px;
	color: ${(props) => props.color || MAIN_THEME.DARK_COLOR};
	margin-bottom: ${(props) => props.offsetBottom || 0}px;
`;

const Container = styled.div<{ columns: string }>`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	gap: 1px;
`;

const ActionsContainer = styled.div`
	height: 50px;
	background: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BaseButton = styled.button`
	border-radius: 100%;
	height: 28px;
	width: 28px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	cursor: pointer;
	background: transparent;
`;

const EditButton = styled(BaseButton)`
	border: 1px solid ${MAIN_THEME.GREY_DARK};
`;
const InfoItem = styled.div`
	background: #ffffff;
	text-align: center;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	flex-shrink: 0;
	flex-direction: column;

	> a {
		text-decoration: none;
	}
`;

interface Currency {
	value: string;
	label: string;
}

const currencyItems = [
	{ value: CurrencyValue.USD, label: "$" },
	{ value: CurrencyValue.AMD, label: "֏" },
	{ value: CurrencyValue.GBP, label: "£" },
] as Array<Currency>;

interface Props {
	data: Reservation;
	onEditClick: (reservation: Reservation) => void;
	showProperty?: boolean;
	propertyName?: string;
	propertyId?: string;
}

const ReservationTableItem = (props: Props): JSX.Element => {
	const { data, onEditClick, showProperty, propertyName, propertyId } = props;

	const {
		checkin_time,
		checkout_time,
		total_price,
		payout_price,
		channel,
		status,
		code,
		nights,
	} = data;

	const currentCurrency = currencyItems.find(
		(item) => item.value === data.currency
	) as Currency;

	const [currency, setCurrency] = useState(currentCurrency);

	const handleEditClick = () => {
		onEditClick(data);
	};

	const columns = useMemo(() => {
		const countOfColumns = showProperty ? 12 : 11;

		let columnsString = "";

		for (let index = 0; index < countOfColumns; index++) {
			columnsString += index > 0 ? " 1fr" : "1fr";
		}

		return columnsString;
	}, [showProperty]);

	const renderActions = () => (
		<EditButton onClick={handleEditClick}>
			<Icon
				name={IconName.RESERVATION}
				size={12}
				color={MAIN_THEME.GREY_DARK}
			/>
		</EditButton>
	);

	const renderPropertyName = () =>
		showProperty ? (
			<InfoItem>
				<Link to={`/properties/${propertyId || ""}`}>
					<InfoValue>{propertyName || ""}</InfoValue>
				</Link>
			</InfoItem>
		) : null;

	const renderStatus = () => {
		let color = MAIN_THEME.DARK_COLOR;

		if (status === "accepted") {
			color = ACCEPT_COLOR;
		} else if (status === "canceled" || status === "cancelled") {
			color = CANCEL_COLOR;
		}

		return <InfoValue color={color}>{status}</InfoValue>;
	};

	return (
		<Container columns={columns}>
			{renderPropertyName()}
			<InfoItem>
				<InfoValue>{channel}</InfoValue>
			</InfoItem>
			<InfoItem>
				<InfoValue>{code}</InfoValue>
			</InfoItem>
			<InfoItem>{renderStatus()}</InfoItem>
			<InfoItem>
				<InfoValue size={13} color={MAIN_THEME.ACCEPT_COLOR} offsetBottom={2}>
					{`${data.guest.first_name} ${data.guest.last_name}`}
				</InfoValue>
				<InfoValue size={13}>{`${data.adults} adults`}</InfoValue>
			</InfoItem>
			<InfoItem>
				<InfoValue>{nights}</InfoValue>
			</InfoItem>
			<InfoItem>
				<InfoValue>{dayjs(checkin_time).format("DD/MM/YYYY")}</InfoValue>
			</InfoItem>
			<InfoItem>
				<InfoValue>{dayjs(checkout_time).format("DD/MM/YYYY")}</InfoValue>
			</InfoItem>
			<InfoItem>
				<InfoValue>{currency.label}</InfoValue>
			</InfoItem>
			<InfoItem>
				<InfoValue>
					{currency.label}
					{!(total_price % 1) ? +total_price : (+total_price).toFixed(1)}
				</InfoValue>
			</InfoItem>
			<InfoItem>
				<InfoValue>
					{currency.label}
					{!(payout_price % 1) ? +payout_price : (+payout_price).toFixed(1)}
				</InfoValue>
			</InfoItem>
			<ActionsContainer>{renderActions()}</ActionsContainer>
		</Container>
	);
};

export default ReservationTableItem;
