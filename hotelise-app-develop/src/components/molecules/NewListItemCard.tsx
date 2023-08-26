import styled from "styled-components";
import { FONT_FAMILY_MEDIUM } from "styles/typography";
import { MAIN_THEME } from "styles/colors";
import { Icon } from "components/atoms";
import { IconName } from "interfaces/icons";

const Title = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	font-size: 16px;
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
`;

const ButtonContainer = styled.div`
	background: #ffffff;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	margin-right: 25px;
`;

const Container = styled.button`
	background: rgba(255, 255, 255, 0.7);
	box-shadow: 1px 3px 14px rgba(0, 0, 0, 0.25);
	filter: drop-shadow(1px 3px 14px rgba(0, 0, 0, 0.25));
	backdrop-filter: blur(30px);
	cursor: pointer;
	height: 60px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	padding: 0 25px;
`;

interface Props {
	onClick: () => void;
	title: string;
	type?: "button" | "submit" | "reset";
}

const NewListItemCard = (props: Props): JSX.Element => {
	const { onClick, title, type } = props;

	return (
		<Container onClick={onClick} type={type || "button"}>
			<ButtonContainer>
				<Icon name={IconName.PLUS} color={MAIN_THEME.GREY_DARK} />
			</ButtonContainer>
			<Title>{title}</Title>
		</Container>
	);
};

export default NewListItemCard;
