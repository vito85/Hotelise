import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { MAIN_THEME } from "styles/colors";

interface Props {
	light?: boolean;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	padding-top: 10px;
`;

const Title = styled.p<Props>`
	font-family: "Open Sans", sans-serif;
	font-size: 14px;
	margin-right: 10px;
	color: ${(props) => (props.light ? "#ffffff" : MAIN_THEME.GREY_DARK)};
`;

const ListLoader = (props: Props): JSX.Element => {
	const { light } = props;

	return (
		<Container>
			<Title light={light}>Loading...</Title>
			<Oval color="#fd0b50" height={20} width={20} />
		</Container>
	);
};

export default ListLoader;
