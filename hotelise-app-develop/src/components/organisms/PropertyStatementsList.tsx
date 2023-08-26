import { useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Toggle from "react-toggle";

import { ListLoader } from "components/atoms";
import { StatementListItem } from "components/molecules";
import { SendStatementInvoiceModal } from "components/organisms";

import {
	getPropertyStatements,
	getPropertyStatementsCount,
	getPropertyStatementsList,
	getPropertyStatementsLoading,
	getPropertyStatementsOnlyActiveStatus,
	getPropertyStatementsTotal,
	setPropertyStatementsActiveStatus,
} from "state/modules/properties";

import { Statement } from "interfaces/statements";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_MEDIUM } from "styles/typography";

const StatementsList = styled(InfiniteScroll as any)`
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
	/* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; */
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

const Header = styled.div`
	margin-bottom: 15px;
`;

const ToggleContainer = styled.div`
	display: flex;
	align-items: center;
`;

const ToggleTitle = styled.p`
	margin-right: 15px;
`;

interface Props {
	propertyId: string;
}

const PropertyStatementsList = (props: Props): JSX.Element => {
	const [selectedStatement, setSelectedStatement] = useState<Statement | null>(
		null
	);

	const { propertyId } = props;

	const statementsList = useSelector(getPropertyStatementsList);
	const isLoading = useSelector(getPropertyStatementsLoading);
	const statementsCount = useSelector(getPropertyStatementsCount);
	const statementsTotal = useSelector(getPropertyStatementsTotal);
	const onlyActiveStatements = useSelector(
		getPropertyStatementsOnlyActiveStatus
	);

	const dispatch = useDispatch();

	const handleCloseEditModal = () => {
		setSelectedStatement(null);
	};

	const handleEditClaim = (statement: Statement) => {
		setSelectedStatement(statement);
	};

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

	const toggleActive = () => {
		dispatch(setPropertyStatementsActiveStatus(!onlyActiveStatements));
		dispatch(
			getPropertyStatements({
				propertyId,
				isLoadMore: false,
			})
		);
	};

	const renderLoader = () =>
		statementsCount <= 0 && isLoading ? (
			<LoaderContainer>
				<ListLoader />
			</LoaderContainer>
		) : null;

	const renderSendModal = () => {
		if (selectedStatement) {
			return (
				<SendStatementInvoiceModal
					statementDetails={selectedStatement}
					isVisible={selectedStatement !== null}
					close={handleCloseEditModal}
					propertyId={propertyId}
					// onSuccess={}
				/>
			);
		}
	};

	const renderStatementsList = () => {
		if (statementsCount) {
			return (
				<StatementsList
					scrollableTarget="statementsContainer"
					dataLength={statementsCount}
					next={loadMore}
					hasMore={hasMore}
					loader={<ListLoader />}
				>
					{statementsList.map((statement: Statement) => (
						<StatementListItem
							data={statement}
							key={statement.id}
							onSendClick={handleEditClaim}
						/>
					))}
				</StatementsList>
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
			{renderSendModal()}
			{renderTableHeader()}
			{renderStatementsList()}
		</Container>
	);
};

export default PropertyStatementsList;
