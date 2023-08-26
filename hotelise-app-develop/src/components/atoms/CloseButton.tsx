import styled from "styled-components";

import { IconName } from "interfaces/icons";
import Icon from "./Icon";

const Container = styled.button`
	width: 30px;
	height: 30px;
	border: 1px solid #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	position: absolute;
	right: 30px;
	top: 30px;
	background: transparent;
	cursor: pointer;
`;

interface Props {
	onClick: () => void;
}

const CloseButton = (props: Props): JSX.Element => {
	const { onClick } = props;

	return (
		<Container onClick={onClick}>
			<Icon name={IconName.CLOSE} color="#ffffff" size={16} />
		</Container>
	);
};

export default CloseButton;
