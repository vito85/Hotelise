import styled from "styled-components";
import { IconName } from "interfaces/icons";
import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_BOLD } from "styles/typography";
import Icon from "./Icon";

const Container = styled.div`
	text-align: center;
`;

const ButtonContainer = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 110px;
	height: 110px;
	background: #ffffff;
	box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.15);
	border-radius: 15px;
	border: none;
	margin-bottom: 10px;
	cursor: pointer;
`;

const Title = styled.p`
	font-family: ${FONT_FAMILY_BOLD};
	font-size: 18px;
	color: ${MAIN_THEME.DARK_COLOR};
`;

interface Props {
	onClick: () => void;
	title?: string;
}

const AddButton = (props: Props): JSX.Element => {
	const { onClick, title } = props;

	return (
		<Container>
			<ButtonContainer onClick={onClick}>
				<Icon name={IconName.PLUS} size={25} color={MAIN_THEME.GREY_DARK} />
			</ButtonContainer>
			{title ? <Title>{title}</Title> : null}
		</Container>
	);
};

export default AddButton;
