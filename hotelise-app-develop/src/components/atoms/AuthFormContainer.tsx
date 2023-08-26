import styled from "styled-components";
import { MAIN_THEME } from "styles/colors";

const Container = styled.div`
	display: flex;
	background: ${MAIN_THEME.GREY_DARK};
	box-shadow: 6px 6px 24px rgba(0, 0, 0, 0.45);
	border-radius: 35px;
	width: 80vw;
	height: 75vh;
	overflow: hidden;
`;

interface Props {
	children?: JSX.Element | Array<JSX.Element>;
}

const AuthFormContainer = (props: Props): JSX.Element => {
	const { children } = props;

	return <Container>{children}</Container>;
};

export default AuthFormContainer;
