import { useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { ListLoader } from "components/atoms";
import { ExpenseTableItem } from "components/molecules";

import {
	getPropertyExpenses,
	getPropertyExpensesCount,
	getPropertyExpensesList,
	getPropertyExpensesLoading,
	getPropertyExpensesTotal,
} from "state/modules/properties";

import { Expense } from "interfaces/expenses";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_MEDIUM } from "styles/typography";

const ExpensesList = styled(InfiniteScroll as any)`
	display: grid;
	grid-template-columns: 1fr;
	width: 100%;
	gap: 1px;
	border-bottom-right-radius: 16px;
	border-bottom-left-radius: 16px;
	overflow: hidden !important;
`;

const Container = styled.div`
	padding: 15px 70px 40px;
`;
const TableHeaderItem = styled.div`
	font-size: 14px;
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

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	gap: 1px;
	margin-bottom: 1px;
	border-top-right-radius: 16px;
	border-top-left-radius: 16px;
	overflow: hidden;
`;

const EmptyListMessage = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
`;

interface Props {
	propertyId: string;
}

const PropertyExpensesList = (props: Props): JSX.Element => {
	const { propertyId } = props;

	const expensesList = useSelector(getPropertyExpensesList);
	const expensesTotal = useSelector(getPropertyExpensesTotal);
	const expensesCount = useSelector(getPropertyExpensesCount);
	const isPropertyExpensesLoading = useSelector(getPropertyExpensesLoading);

	const dispatch = useDispatch();

	const hasMore = useMemo(
		() => expensesCount < expensesTotal,
		[expensesCount, expensesTotal]
	);

	const loadMore = () => {
		if (!isPropertyExpensesLoading) {
			dispatch(getPropertyExpenses(propertyId, true));
		}
	};

	const renderExpensesList = () => (
		<ExpensesList
			scrollableTarget="propertyDetailsListContainer"
			dataLength={expensesCount}
			next={loadMore}
			hasMore={hasMore}
			loader={<ListLoader />}
		>
			{expensesList.map((expense: Expense) => (
				<ExpenseTableItem data={expense} key={expense.id} />
			))}
		</ExpensesList>
	);

	const renderTableHeader = () =>
		expensesList.length ? (
			<TableHeader>
				<TableHeaderItem>Name</TableHeaderItem>
				<TableHeaderItem>Description</TableHeaderItem>
				<TableHeaderItem>Amount</TableHeaderItem>
				<TableHeaderItem>Currency</TableHeaderItem>
				<TableHeaderItem>Date</TableHeaderItem>
			</TableHeader>
		) : (
			<EmptyListMessage>Empty list</EmptyListMessage>
		);

	return (
		<Container>
			{renderTableHeader()}
			{renderExpensesList()}
		</Container>
	);
};

export default PropertyExpensesList;
