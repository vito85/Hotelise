import styled from "styled-components";
import dayjs from "dayjs";

import { MAIN_THEME } from "styles/colors";

import { Expense } from "interfaces/expenses";

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

const Table = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	gap: 1px;

	&:hover {
		${TableCell} {
			background-color: #daebfe;
		}
	}
`;

interface Props {
	data: Expense;
	showProperty?: boolean;
}

const ExpenseTableItem = (props: Props): JSX.Element => {
	const { data, showProperty } = props;

	const { name, description, amount, expense_date, currency, id } = data;

	return (
		<Table>
			{showProperty ? <TableCell>{data.propertyName || ""}</TableCell> : null}
			<TableCell>{name || "-"}</TableCell>
			<TableCell>{description}</TableCell>
			<TableCell>{amount}</TableCell>
			<TableCell>{currency}</TableCell>
			<TableCell>{dayjs(expense_date).format("DD/MM/YYYY")}</TableCell>
		</Table>
	);
};

export default ExpenseTableItem;
