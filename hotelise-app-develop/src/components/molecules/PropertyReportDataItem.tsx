import styled from "styled-components";
import dayjs from "dayjs";
import { useMemo } from "react";

import { Icon } from "components/atoms";

import { ReportTableItemWithTransfer } from "interfaces/reports";

import { IconName } from "interfaces/icons";

import { getChannelName } from "utils/channels";

import { MAIN_THEME } from "styles/colors";

const InfoText = styled.p<{ color?: string }>`
	color: ${MAIN_THEME.GREY_DARK};
	display: flex;
	align-items: center;
	font-size: 11px;
	justify-content: center;
	text-align: center;
	height: 38px;
	background: #ffffff;
	color: ${(props) => props.color || MAIN_THEME.DARK_COLOR};
`;

const TableRow = styled.div<{ columns: string }>`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	gap: 1px;
	cursor: pointer;

	&:hover {
		${InfoText} {
			background-color: #daebfe;
		}
	}
`;

interface Props {
	data: ReportTableItemWithTransfer;
	showProperty?: boolean;
	onSelect: (item: ReportTableItemWithTransfer | null) => void;
}

const PropertyReportDataItem = (props: Props): JSX.Element => {
	const { data, showProperty, onSelect } = props;
	const {
		start_date,
		end_date,
		guest,
		currency,
		accommodation,
		host_service_fee,
		cleaning,
		payout_price,
		net_accomdation,
		hotelise_help,
		owner_income,
		channel,
		code,
		status,
	} = data._item;
	const { _accountHolder, _toTransfer } = data._transferDetails;

	const channelName = getChannelName(channel);

	const renderAccountHolderIcon = () =>
		_accountHolder === 1 ? (
			<Icon name={IconName.LOGO} size={18} color={MAIN_THEME.GREY_DARK} />
		) : (
			<Icon name={IconName.USER} size={20} color={MAIN_THEME.GREY_DARK} />
		);

	const name = useMemo(() => {
		const nameWithoutDash = (data.property?.name || "").replaceAll("-", " ");
		const nameWithoutUnderscore = nameWithoutDash.replaceAll("_", " ");

		return (
			nameWithoutUnderscore.charAt(0).toUpperCase() +
			nameWithoutUnderscore.slice(1)
		);
	}, [data]);

	const renderStatus = () => {
		let color = MAIN_THEME.DARK_COLOR;

		if (status === "accepted") {
			color = MAIN_THEME.ACCEPT_COLOR;
		} else if (status === "canceled" || status === "cancelled") {
			color = MAIN_THEME.CANCEL_COLOR;
		}

		return <InfoText color={color}>{status || "N/A"}</InfoText>;
	};

	return (
		<TableRow
			onClick={() => onSelect(data)}
			columns={
				showProperty
					? "1fr 1fr 1fr 0.5fr 1fr 0.75fr 0.75fr 0.65fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr"
					: "1fr 1fr 0.5fr 1fr 0.75fr 0.75fr 0.65fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr"
			}
		>
			{showProperty ? (
				<InfoText
					style={{
						textTransform: "capitalize",
					}}
				>
					{name}
				</InfoText>
			) : null}
			<InfoText>{channelName}</InfoText>
			<InfoText>{code}</InfoText>
			{renderStatus()}
			<InfoText>
				{guest.first_name} {guest.last_name}
			</InfoText>
			<InfoText>{dayjs(start_date).format("DD/MM/YYYY")}</InfoText>
			<InfoText>{dayjs(end_date).format("DD/MM/YYYY")}</InfoText>
			<InfoText>{currency}</InfoText>
			<InfoText>{accommodation}</InfoText>
			<InfoText>{host_service_fee}</InfoText>
			<InfoText>{net_accomdation}</InfoText>
			<InfoText>{cleaning}</InfoText>
			<InfoText>{payout_price}</InfoText>
			<InfoText>{hotelise_help}</InfoText>
			<InfoText>{owner_income}</InfoText>
			<InfoText>{_toTransfer}</InfoText>
			<InfoText>{renderAccountHolderIcon()}</InfoText>
		</TableRow>
	);
};

export default PropertyReportDataItem;
