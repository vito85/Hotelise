import styled from "styled-components";
import { FormEvent, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { Icon, ModalContainer, ModalRoot } from "components/atoms";
import { Input } from "components/molecules";

import { IconName } from "interfaces/icons";
import { BaseModalProps } from "interfaces/modals";
import { Statement } from "interfaces/statements";

import { selectComponentStyles } from "utils/selectStyles";

import { ReportSendBody } from "models/statements";

import StatementsClient from "services/api/statements";

import { getPropertyStatements } from "state/modules/properties";

import { FONT_FAMILY_BOLD } from "styles/typography";
import { MAIN_THEME } from "styles/colors";

interface ActionButtonProps {
	left?: boolean;
	right?: boolean;
	apply?: boolean;
	cancel?: boolean;
}

const CloseButton = styled.button`
	border: 1px solid #ffffff;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 30px;
	top: 30px;
	cursor: pointer;
	outline: none;
	background: transparent;
`;

const Form = styled.form`
	width: 400px;
`;

const InputWrap = styled.div`
	margin-bottom: 20px;
`;

const Actions = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 30px;
`;

const ActionButton = styled.button<ActionButtonProps>`
	display: flex;
	width: 200px;
	height: 54px;
	justify-content: center;
	align-items: center;
	border-top-left-radius: ${(props) => (props.left ? "109px" : 0)};
	border-bottom-left-radius: ${(props) => (props.left ? "109px" : 0)};
	border-top-right-radius: ${(props) => (props.right ? "109px" : 0)};
	border-bottom-right-radius: ${(props) => (props.right ? "109px" : 0)};
	border: none;
	background-color: ${(props) =>
		props.apply ? MAIN_THEME.ACCEPT_COLOR : MAIN_THEME.CANCEL_COLOR};
	color: #ffffff;
	font-family: ${FONT_FAMILY_BOLD};
	font-size: 18px;
	cursor: pointer;
`;

const Title = styled.p`
	font-family: ${FONT_FAMILY_BOLD};
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 33px;
	letter-spacing: 0.03em;
	text-transform: uppercase;
	color: #ffffff;
	margin-bottom: 30px;
`;

enum Recipient {
	OWNERS,
	CUSTOM_EMAIL,
}

interface RecipientItem {
	value: Recipient;
	label: string;
}

const recipientItems = [
	{ value: Recipient.OWNERS, label: "Owners" },
	{ value: Recipient.CUSTOM_EMAIL, label: "Custom Email" },
] as RecipientItem[];

interface Props extends BaseModalProps {
	statementDetails: Statement;
	onSuccess?: () => void;
	propertyId: string;
}

const SendStatementInvoiceModal = (props: Props): JSX.Element => {
	const [selectedRecipient, setSelectedRecipient] = useState(recipientItems[0]);
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const { isVisible, close, statementDetails, onSuccess, propertyId } = props;

	const handleChangeEmail = (value: string | number) => {
		setEmail(`${value}`);
	};

	const handleChangeRecipient = (value: RecipientItem | null) => {
		if (value) {
			setSelectedRecipient(value);
		}
	};

	const resetForm = () => {
		setEmail("");
		setSelectedRecipient(recipientItems[0]);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		setIsLoading(true);

		const reportSendBody = {} as ReportSendBody;

		if (selectedRecipient.value === Recipient.OWNERS) {
			reportSendBody.sendToOwners = true;
		}

		if (selectedRecipient.value === Recipient.CUSTOM_EMAIL) {
			reportSendBody.receiver = email;
		}

		if (statementDetails) {
			try {
				const res = await StatementsClient.sendStatement({
					propertyId,
					statementId: statementDetails.id,
					data: reportSendBody,
				});

				if (res.status === 201) {
					setTimeout(() => {
						// if (onSuccess) {
						//   onSuccess();
						// }

						dispatch(
							getPropertyStatements({
								propertyId,
								isLoadMore: false,
							})
						);
						resetForm();
						setIsLoading(false);
						close();
					}, 1500);
				}
			} catch (error) {
				console.log({ error });
				setIsLoading(false);
			}
		}
	};

	const renderLoader = () => (
		<ThreeDots color="#ffffff" height={20} width={60} />
	);

	const renderAcceptButton = () => (
		<ActionButton left apply type="submit">
			{isLoading ? renderLoader() : "SEND"}
		</ActionButton>
	);

	const cancelButton = () => (
		<ActionButton right cancel onClick={close}>
			CANCEL
		</ActionButton>
	);

	return isVisible ? (
		<ModalRoot onClick={close}>
			<ModalContainer>
				<CloseButton onClick={close}>
					<Icon name={IconName.CLOSE} color="#ffffff" />
				</CloseButton>
				<Title>Send Invoice</Title>
				<Form onSubmit={handleSubmit}>
					<InputWrap>
						<Select
							value={selectedRecipient}
							onChange={handleChangeRecipient}
							styles={{
								...selectComponentStyles,
							}}
							options={recipientItems}
						/>
					</InputWrap>
					{selectedRecipient.value === Recipient.CUSTOM_EMAIL ? (
						<InputWrap>
							<Input
								value={email}
								onChange={handleChangeEmail}
								placeholder="Email"
							/>
						</InputWrap>
					) : null}
					<Actions>
						{renderAcceptButton()}
						{cancelButton()}
					</Actions>
				</Form>
			</ModalContainer>
		</ModalRoot>
	) : (
		<></>
	);
};

export default SendStatementInvoiceModal;
