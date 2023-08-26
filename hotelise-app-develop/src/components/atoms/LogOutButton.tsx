import { Auth } from "aws-amplify";
import styled from "styled-components";

import { IconName } from "interfaces/icons";

import Icon from "./Icon";

interface Props {
	isExpanded: boolean;
}

const Title = styled.p`
	color: #ffffff;
	font-size: 18px;
	margin-left: 30px;
`;

const ContainerBase = styled.button`
	outline: none;
	border: none;
	height: 70px;
	width: 100%;
	display: flex;
	align-items: center;
	background: transparent;
	cursor: pointer;
`;

const ExpandedContainer = styled(ContainerBase)`
	padding: 0 30px;
`;

const Container = styled(ContainerBase)`
	justify-content: center;
`;

const LogOutButton = (props: Props): JSX.Element => {
	const { isExpanded } = props;

	const handleLogout = () => {
		Auth.signOut();
	};

	const renderInnerContent = () => (
		<>
			<Icon name={IconName.LOGOUT} size={25} color="#ffffff" />
			{isExpanded ? <Title>Log Out</Title> : null}
		</>
	);

	return isExpanded ? (
		<ExpandedContainer onClick={handleLogout}>
			{renderInnerContent()}
		</ExpandedContainer>
	) : (
		<Container onClick={handleLogout}>{renderInnerContent()}</Container>
	);
};

export default LogOutButton;
