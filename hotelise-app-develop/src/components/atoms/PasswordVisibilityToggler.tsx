import { IconName } from "interfaces/icons";
import styled from "styled-components";
import Icon from "./Icon";

interface Props {
	isPasswordVisible: boolean;
	toggle: () => void;
}

const Container = styled.button`
	width: 100%;
	height: 100%;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
	outline: none;
	cursor: pointer;
`;

const PasswordVisibilityToggler = (props: Props): JSX.Element => {
	const { isPasswordVisible, toggle } = props;

	return (
		<Container onClick={toggle} type="button">
			<Icon
				name={isPasswordVisible ? IconName.EYE : IconName.CLOSED_EYE}
				color="#ffffff"
				size={isPasswordVisible ? 10 : 14}
			/>
		</Container>
	);
};

export default PasswordVisibilityToggler;
