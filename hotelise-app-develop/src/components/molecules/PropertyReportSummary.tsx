import styled from "styled-components";

import { Icon, ListLoader } from "components/atoms";

import { IconName } from "interfaces/icons";

import {
	CurrencyAccountTransfer,
	PropertyReportCalculations,
} from "interfaces/reports";

import { FONT_FAMILY_MEDIUM } from "styles/typography";
import { MAIN_THEME } from "styles/colors";
import { CurrencyValue } from "interfaces/currency";

interface TableProps {
	columns: string;
}

interface TitleProps {
	offsetBottom?: number;
}

const TableHeader = styled.div<TableProps>`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	gap: 1px;
	margin-bottom: 1px;
	border-top-right-radius: 16px;
	border-top-left-radius: 16px;
	overflow: hidden;
`;

const TableItemCell = styled.div`
	background: #ffffff;
	height: 38px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const TableItem = styled.div<TableProps>`
	display: grid;
	gap: 1px;
	grid-template-columns: ${(props) => props.columns};

	&:hover {
		${TableItemCell} {
			background-color: #daebfe;
		}
	}
`;

const Content = styled.div`
	display: grid;
	padding: 15px 0;
	grid-template-columns: 1fr;
	gap: 20px;
	margin-bottom: 20px;
`;

const TitleContainer = styled.div<TitleProps>`
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: ${(props) => props.offsetBottom || 10}px;
`;

const Title = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 26px;
	line-height: 26px;
	margin: 0 5px;
	flex-shrink: 0;
`;

const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: #000;
`;

const Container = styled.div`
	padding: 15px 0;
`;

const InnerTable = styled.div<TableProps>`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	gap: 15px;
`;

const ReportTableHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 1px;
	margin-bottom: 1px;
	border-top-right-radius: 16px;
	border-top-left-radius: 16px;
	overflow: hidden;
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

const TableContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 2px;
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
	overflow: hidden;
	background: #f2f2f2;
`;

const EmptyListMessageContainer = styled.div`
	background: #ffffff;
	height: 100%;
`;

const EmptyListMessage = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	background: #ffffff;
	padding: 15px;
`;

const TableContainer = styled.div`
	width: 100%;
	border-radius: 16px;
	display: inline-flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
`;

const TableSubTitle = styled.p`
	margin-bottom: 15px;
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
	background: #f2f2f2;
	padding: 5px;
`;

interface Props {
	data: PropertyReportCalculations;
	isLoading: boolean;
}

const PropertyReportSummary = (props: Props): JSX.Element => {
	const { data, isLoading } = props;

	const { mergedAccountTransfers, deltaAccountTransfers, finalTransfers } =
		data;

	const renderAccountHolderIcon = (accountHolder: number) =>
		accountHolder === 1 ? (
			<Icon name={IconName.LOGO} size={18} color={MAIN_THEME.GREY_DARK} />
		) : (
			<Icon name={IconName.USER} size={20} color={MAIN_THEME.GREY_DARK} />
		);

	const renderDeltaAccountTransferItem = (
		deltaAccountTransfer: CurrencyAccountTransfer
	) => {
		const { _toTransfer, _accountHolder, _amount, _currency } =
			deltaAccountTransfer;

		return (
			<TableItem
				columns="1fr 1fr 1fr 1fr"
				key={_toTransfer + _accountHolder + _amount}
			>
				<TableItemCell>{_amount}</TableItemCell>
				<TableItemCell>{_toTransfer}</TableItemCell>
				<TableItemCell>{_currency}</TableItemCell>
				<TableItemCell>{renderAccountHolderIcon(_accountHolder)}</TableItemCell>
			</TableItem>
		);
	};

	const renderMergedAccountTransferItem = (
		mergedAccountTransfer: CurrencyAccountTransfer
	) => {
		const { _toTransfer, _accountHolder, _amount, _currency } =
			mergedAccountTransfer;

		return (
			<TableItem
				columns="1fr 1fr 1fr 1fr"
				key={_toTransfer + _accountHolder + _amount}
			>
				<TableItemCell>{_amount}</TableItemCell>
				<TableItemCell>{_toTransfer}</TableItemCell>
				<TableItemCell>{_currency}</TableItemCell>
				<TableItemCell>{renderAccountHolderIcon(_accountHolder)}</TableItemCell>
			</TableItem>
		);
	};

	const renderFinalCurrencyAndAccountsItem = (
		finalCurrencyAndAccountsItem: CurrencyAccountTransfer
	) => {
		const { _toTransfer, _accountHolder, _amount, _currency } =
			finalCurrencyAndAccountsItem;

		return (
			<TableItem
				columns="1fr 1fr 1fr 1fr"
				key={_toTransfer + _accountHolder + _amount}
			>
				<TableItemCell>{_amount}</TableItemCell>
				<TableItemCell>{_toTransfer}</TableItemCell>
				<TableItemCell>{_currency}</TableItemCell>
				<TableItemCell>{renderAccountHolderIcon(_accountHolder)}</TableItemCell>
			</TableItem>
		);
	};

	const renderMergedAccountTransfers = () => (
		<InfoContainer>
			<TableSubTitle>Transfers (All Accounts)</TableSubTitle>
			<TableContainer>
				{mergedAccountTransfers.length ? (
					<>
						<ReportTableHeader>
							<TableHeaderItem>Owner Income</TableHeaderItem>
							<TableHeaderItem>Transfer Amount</TableHeaderItem>
							<TableHeaderItem>Currency</TableHeaderItem>
							<TableHeaderItem>Sender</TableHeaderItem>
						</ReportTableHeader>
						<TableContent>
							{mergedAccountTransfers.map((mergedAccountTransfer) =>
								renderMergedAccountTransferItem(mergedAccountTransfer)
							)}
						</TableContent>
					</>
				) : (
					<EmptyListMessageContainer>
						<EmptyListMessage>Empty list</EmptyListMessage>
					</EmptyListMessageContainer>
				)}
			</TableContainer>
		</InfoContainer>
	);

	const renderRemainingExpensesItem = (key: string) => {
		const itemValue = finalTransfers.remainingExpenses[key as CurrencyValue];

		return (
			<TableItem columns="1fr 1fr" key={key + itemValue}>
				<TableItemCell>{key}</TableItemCell>
				<TableItemCell>{itemValue}</TableItemCell>
			</TableItem>
		);
	};

	const renderDeltaAccountTransfers = () => (
		<InfoContainer>
			<TableSubTitle>Net Transfers (Between Accounts)</TableSubTitle>
			<TableContainer>
				{deltaAccountTransfers.length ? (
					<>
						<TableHeader columns="1fr 1fr 1fr 1fr">
							<TableHeaderItem>Owner Income</TableHeaderItem>
							<TableHeaderItem>Transfer Amount</TableHeaderItem>
							<TableHeaderItem>Currency</TableHeaderItem>
							<TableHeaderItem>Sender</TableHeaderItem>
						</TableHeader>
						<TableContent>
							{deltaAccountTransfers.map(
								(deltaAccountTransfer: CurrencyAccountTransfer) =>
									renderDeltaAccountTransferItem(deltaAccountTransfer)
							)}
						</TableContent>
					</>
				) : (
					<EmptyListMessageContainer>
						<EmptyListMessage>Empty list</EmptyListMessage>
					</EmptyListMessageContainer>
				)}
			</TableContainer>
		</InfoContainer>
	);

	const renderFinalCurrencyAndAccounts = () => (
		<InfoContainer>
			<TableSubTitle>Net Transfers (After Expenses)</TableSubTitle>
			<TableContainer>
				{finalTransfers.finalCurrencyAndAccounts.length ? (
					<>
						<TableHeader columns="1fr 1fr 1fr 1fr">
							<TableHeaderItem>Owner Income</TableHeaderItem>
							<TableHeaderItem>Transfer</TableHeaderItem>
							<TableHeaderItem>Currency</TableHeaderItem>
							<TableHeaderItem>Sender</TableHeaderItem>
						</TableHeader>
						<TableContent>
							{finalTransfers.finalCurrencyAndAccounts.map(
								(finalCurrencyAndAccount: CurrencyAccountTransfer) =>
									renderFinalCurrencyAndAccountsItem(finalCurrencyAndAccount)
							)}
						</TableContent>
					</>
				) : (
					<EmptyListMessageContainer>
						<EmptyListMessage>Empty list</EmptyListMessage>
					</EmptyListMessageContainer>
				)}
			</TableContainer>
		</InfoContainer>
	);

	const renderRemainingExpenses = () => (
		<InfoContainer>
			<TableSubTitle>Remaining Expenses</TableSubTitle>
			<TableContainer>
				{Object.keys(finalTransfers.remainingExpenses).length ? (
					<>
						<TableHeader columns="1fr 1fr">
							<TableHeaderItem>Currency</TableHeaderItem>
							<TableHeaderItem>Amount</TableHeaderItem>
						</TableHeader>
						<TableContent>
							{Object.keys(finalTransfers.remainingExpenses).map(
								(key: string) => renderRemainingExpensesItem(key)
							)}
						</TableContent>
					</>
				) : (
					<EmptyListMessageContainer>
						<EmptyListMessage>Empty list</EmptyListMessage>
					</EmptyListMessageContainer>
				)}
			</TableContainer>
		</InfoContainer>
	);

	const renderFinalTransfers = () => (
		<>
			<TitleContainer offsetBottom={25}>
				<Divider />
				<Title>Final Transfers</Title>
				<Divider />
			</TitleContainer>
			<InfoContainer>
				<InnerTable columns="1.5fr 0.5fr">
					{renderFinalCurrencyAndAccounts()}
					{renderRemainingExpenses()}
				</InnerTable>
			</InfoContainer>
		</>
	);

	const renderContent = () =>
		!isLoading ? (
			<>
				<Content>
					{renderMergedAccountTransfers()}
					{renderDeltaAccountTransfers()}
				</Content>
				{renderFinalTransfers()}
			</>
		) : null;

	return (
		<Container>
			<TitleContainer>
				<Divider />
				<Title>Summary</Title>
				<Divider />
			</TitleContainer>
			{isLoading ? <ListLoader /> : null}
			{renderContent()}
		</Container>
	);
};

export default PropertyReportSummary;
