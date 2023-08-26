import styled from "styled-components";
import { IconName } from "interfaces/icons";
import { MAIN_THEME } from "styles/colors";
import dayjs from "dayjs";
import Icon from "./Icon";

const Title = styled.p`
	margin-left: 11px;
	text-transform: uppercase;
	font-size: 14px;
`;

const Container = styled.button`
	min-width: 170px;
	height: 38px;
	background: ${MAIN_THEME.GREY_DARK};
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	font-family: "Open Sans Medium", sans-serif;
	font-size: 16px;
	color: #ffffff;
	letter-spacing: 0.03em;
	border: none;
	outline: none;
	cursor: pointer;
`;

interface Props {
	onClick: () => void;
	dateRange: { dateFrom: string | null; dateTo: string | null };
}

const FilterButton = (props: Props): JSX.Element => {
	const { onClick, dateRange } = props;

	const formatDate = (dateFrom: string, dateTo: string) => {
		const fromDate = dayjs(dateFrom);
		const toDate = dayjs(dateTo);

		if (fromDate.isSame(toDate, "year")) {
			if (fromDate.isSame(toDate, "month")) {
				return `${fromDate.format("D")}-${toDate.format(
					"D"
				)}, ${fromDate.format("MMM, YYYY")}`;
			}

			return `${fromDate.format("D MMM")} - ${toDate.format("D MMM, YYYY")}`;
		}

		return `${fromDate.format("D MMM, YYYY")} - ${toDate.format(
			"D MMM, YYYY"
		)}`;
	};

	const formattedDate = formatDate(
		dateRange.dateFrom || "",
		dateRange.dateTo || ""
	);

	return (
		<Container onClick={onClick}>
			<Icon name={IconName.FILTER} color="#ffffff" size={16} />
			<Title>{formattedDate}</Title>
		</Container>
	);
};

export default FilterButton;
