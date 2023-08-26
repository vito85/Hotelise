import styled from "styled-components";

import appFlowContainerBg from "assets/images/appFlowBg.png";

const Container = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	background-image: url(${appFlowContainerBg});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;
const InnerContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.85);
`;

interface Props {
	children?: JSX.Element | Array<JSX.Element>;
}

const AppFlowContainer = (props: Props): JSX.Element => {
	const { children } = props;

	return (
		<Container>
			<InnerContainer>{children}</InnerContainer>
		</Container>
	);
};

export default AppFlowContainer;
