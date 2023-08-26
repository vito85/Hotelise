import styled from "styled-components";
import dayjs from "dayjs";

import { Icon } from "components/atoms";

import { Statement } from "interfaces/statements";
import { IconName } from "interfaces/icons";

import StatementsClient from "services/api/statements";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_MEDIUM, FONT_WEIGHT_MEDIUM } from "styles/typography";

interface TableProps {
	columns?: string;
}

const DownloadLink = styled.button`
	border: none;
	outline: none;
	cursor: pointer;
	background: transparent;
	color: ${MAIN_THEME.ACCEPT_COLOR};
	font-family: ${FONT_FAMILY_MEDIUM};
	font-weight: ${FONT_WEIGHT_MEDIUM};
`;

const Table = styled.div<TableProps>`
	display: grid;
	/* grid-template-columns: ${(props) => props.columns}; */
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	gap: 1px;
`;

const BaseButton = styled.button`
	border: 1px solid ${MAIN_THEME.GREY_DARK};
	border-radius: 100%;
	height: 28px;
	width: 28px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	cursor: pointer;
	margin: 0 auto;
`;

const EditButton = styled(BaseButton)`
	border: 1px solid ${MAIN_THEME.GREY_DARK};
`;

const TableCell = styled.div`
	color: ${MAIN_THEME.GREY_DARK};
	display: flex;
	align-items: center;
	font-size: 14px;
	justify-content: center;
	text-align: center;
	min-height: 38px;
	padding: 3px;
	background: #ffffff;
`;

interface Props {
	data: Statement;
	onSendClick?: (statement: Statement) => void;
	hideEditAction?: boolean;
	hideDeleteAction?: boolean;
	showProperty?: boolean;
}

const StatementListItem = (props: Props): JSX.Element => {
	const { data, onSendClick, hideEditAction, hideDeleteAction, showProperty } =
		props;

	const { month, year, reportData, sent, createdAt, reviewed, propertyId, id } =
		data;

	const handleSendClick = () => {
		if (onSendClick) {
			onSendClick(data);
		}
	};

	const handleDonwload = async () => {
		try {
			const res = await StatementsClient.getStatementDownloadLink({
				propertyId,
				statementId: id,
			});

			if (res.status === 200) {
				const { url } = res.data;

				const link = document.createElement("a");

				link.setAttribute("download", "report");
				link.setAttribute("target", "_blank");
				link.href = url;

				document.body.appendChild(link);

				link.click();
			}
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<Table
		// columns={tableColumns}
		>
			{showProperty ? <TableCell>{data?.propertyName || ""}</TableCell> : null}
			<TableCell>
				{`${dayjs()
					.month(+month - 1)
					.format("MMMM")}, ${year}`}
			</TableCell>
			<TableCell>{reportData.reportItems.length}</TableCell>
			<TableCell>
				{reportData.calculations.totalInCurrency.totalIncomeInCurrency}
			</TableCell>
			<TableCell>
				{reportData.calculations.totalInCurrency.totalExpensesInCurrency}
			</TableCell>
			<TableCell>
				{reportData.calculations.totalInCurrency.netOwnerIncomeInCurrency}
			</TableCell>
			<TableCell>{dayjs(createdAt).format("D MMMM, YY HH:mm")}</TableCell>
			<TableCell>
				<DownloadLink onClick={handleDonwload}>PDF</DownloadLink>
			</TableCell>
		</Table>
	);
};

export default StatementListItem;
