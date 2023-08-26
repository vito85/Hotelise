import { useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { ListLoader, LoaderWithOverlay } from "components/atoms";
import { ExpenseTableItem } from "components/molecules";

import { Expense } from "interfaces/expenses";

import {
	getExpenses,
	getExpensesCount,
	getExpensesList,
	getExpensesLoading,
	getExpensesTotal,
} from "state/modules/expenses";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_MEDIUM } from "styles/typography";

const List = styled(InfiniteScroll as any)`
	display: grid;
	grid-template-columns: 1fr;
	width: 100%;
	gap: 1px;
	border-bottom-right-radius: 16px;
	border-bottom-left-radius: 16px;
	overflow: hidden !important;
	position: relative;
`;

const Container = styled.div`
	padding: 15px 30px 40px;
	overflow-y: auto;
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
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
	showProperty?: boolean;
}

const ExpensesList = (props: Props): JSX.Element => {
	const { showProperty } = props;

	const expensesList = useSelector(getExpensesList);
	const expensesTotal = useSelector(getExpensesTotal);
	const expensesCount = useSelector(getExpensesCount);
	const isLoading = useSelector(getExpensesLoading);

	const dispatch = useDispatch();

	const hasMore = useMemo(
		() => expensesCount < expensesTotal,
		[expensesCount, expensesTotal]
	);

	const loadMore = () => {
		if (!isLoading) {
			dispatch(getExpenses(true));
		}
	};

	const renderExpensesList = () => (
		<List
			scrollableTarget="propertyDetailsListContainer"
			dataLength={expensesCount}
			next={loadMore}
			hasMore={hasMore}
			loader={<ListLoader />}
		>
			{expensesList.map((expense: Expense) => (
				<ExpenseTableItem showProperty data={expense} key={expense.id} />
			))}
			{isLoading ? <LoaderWithOverlay /> : null}
		</List>
	);

	const renderTableHeader = () =>
		expensesList.length ? (
			<TableHeader>
				{showProperty ? <TableHeaderItem>Property</TableHeaderItem> : null}
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

export default ExpensesList;
