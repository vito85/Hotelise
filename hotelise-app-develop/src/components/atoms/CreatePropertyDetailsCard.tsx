import { IconName } from "interfaces/icons";
import styled from "styled-components";

import { MAIN_THEME } from "styles/colors";

import Icon from "./Icon";

const Container = styled.button`
	/* background: rgba(255, 255, 255, 1); */
	box-shadow: 7px 9px 12px rgba(0, 0, 0, 0.4);
	width: 100%;
	border-radius: 15px;
	padding: 15px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	min-height: 180px;
	cursor: pointer;
`;

interface Props {
	onCreate: () => void;
}

const CreatePropertyDetailsCard = (props: Props): JSX.Element => {
	const { onCreate } = props;

	return (
		<Container onClick={onCreate}>
			<Icon name={IconName.PLUS} size={14} color={MAIN_THEME.GREY_DARK} />
		</Container>
	);
};

export default CreatePropertyDetailsCard;
