import styled from "styled-components";

import authFlowContainerBg from "assets/images/authBg.png";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background-image: url(${authFlowContainerBg});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

interface Props {
	children?: JSX.Element;
}

const AuthFlowContainer = (props: Props): JSX.Element => {
	const { children } = props;

	return <Container>{children}</Container>;
};

export default AuthFlowContainer;
