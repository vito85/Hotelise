import { useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { ListLoader } from "components/atoms";
import { StatementListItem } from "components/molecules";
// import { SendStatementInvoiceModal } from "components/organisms";

import { Statement } from "interfaces/statements";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_MEDIUM } from "styles/typography";
import {
	getStatementsCount,
	getStatementsList,
	getStatementsLoading,
	getStatementsTotal,
} from "state/modules/statements";

const List = styled(InfiniteScroll as any)`
	display: grid;
	grid-template-columns: 1fr;
	width: 100%;
	gap: 1px;
	border-bottom-right-radius: 16px;
	border-bottom-left-radius: 16px;
	overflow: hidden !important;
`;

const Container = styled.div`
	padding: 15px 20px 40px;
`;

const TableHeaderItem = styled.div`
	font-size: 14px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	height: 38px;
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
	color: #ffffff;
`;

const EmptyListMessage = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
`;

const LoaderContainer = styled.div`
	padding: 0;
`;

interface Props {
	showProperty?: boolean;
}

const StatementsList = (props: Props): JSX.Element => {
	const [selectedStatement, setSelectedStatement] = useState<Statement | null>(
		null
	);

	const { showProperty } = props;

	const statements = useSelector(getStatementsList);

	const isLoading = useSelector(getStatementsLoading);
	const statementsCount = useSelector(getStatementsCount);
	const statementsTotal = useSelector(getStatementsTotal);

	const dispatch = useDispatch();

	const hasMore = useMemo(
		() => statementsCount < statementsTotal,
		[statementsCount, statementsTotal]
	);

	const loadMore = () => {
		if (!isLoading) {
			// dispatch();
			// getPropertyClaims({
			// 	propertyId,
			// 	isLoadMore: true,
			// })
		}
	};

	const renderLoader = () =>
		statementsCount <= 0 && isLoading ? (
			<LoaderContainer>
				<ListLoader />
			</LoaderContainer>
		) : null;

	// const renderSendModal = () => {
	// 	if (selectedStatement) {
	// 		return (
	// 			<SendStatementInvoiceModal
	// 				statementDetails={selectedStatement}
	// 				isVisible={selectedStatement !== null}
	// 				close={() => console.log("")}
	// 				// close={handleCloseEditModal}
	// 				propertyId={propertyId}
	// 				// onSuccess={}
	// 			/>
	// 		);
	// 	}
	// };

	const renderStatementsList = () => {
		if (statementsCount) {
			return (
				<List
					scrollableTarget="statementsContainer"
					dataLength={statementsCount}
					next={loadMore}
					hasMore={hasMore}
					loader={<ListLoader />}
				>
					{statements.map((statement: Statement) => (
						<StatementListItem
							data={statement}
							key={statement.id}
							onSendClick={() => console.log("")}
							showProperty
							// onSendClick={handleEditClaim}
						/>
					))}
				</List>
			);
		}

		if (isLoading) {
			return renderLoader();
		}

		return <EmptyListMessage>Empty list</EmptyListMessage>;
	};

	const renderTableHeader = () =>
		statementsCount ? (
			<TableHeader>
				{showProperty ? <TableHeaderItem>Property</TableHeaderItem> : null}
				<TableHeaderItem>Period</TableHeaderItem>
				<TableHeaderItem>Reservations</TableHeaderItem>
				<TableHeaderItem>Income</TableHeaderItem>
				<TableHeaderItem>Expenses</TableHeaderItem>
				<TableHeaderItem>Paid Out</TableHeaderItem>
				<TableHeaderItem>Created At</TableHeaderItem>
				<TableHeaderItem>View Invoice</TableHeaderItem>
			</TableHeader>
		) : null;

	return (
		<Container>
			{/* {renderSendModal()} */}
			{renderTableHeader()}
			{renderStatementsList()}
		</Container>
	);
};

export default StatementsList;
