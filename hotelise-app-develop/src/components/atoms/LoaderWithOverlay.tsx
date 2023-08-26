import styled from "styled-components";
import { Oval } from "react-loader-spinner";

const Title = styled.p`
	color: #fff;
	font-size: 24px;
	margin-right: 10px;
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 10;
`;

const LoaderWithOverlay = () => {
	return (
		<Container>
			<Title>Loading...</Title>
			<Oval color="#fff" width={35} secondaryColor="#222222" />
		</Container>
	);
};

export default LoaderWithOverlay;
