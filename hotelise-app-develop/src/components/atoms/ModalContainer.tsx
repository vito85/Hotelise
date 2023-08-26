import styled from "styled-components";
import { MAIN_THEME } from "styles/colors";

interface ContainerProps {
	padding?: string;
	width?: string;
	maxWidth?: string;
}

const Container = styled.div<ContainerProps>`
	background: ${MAIN_THEME.GREY_DARK};
	backdrop-filter: blur(20px);
	border-radius: 15px;
	padding: ${(props) => (props.padding ? `${props.padding}` : "82px 130px")};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: ${(props) => (props.width ? `${props.width}` : "auto")};
	max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}` : "100%")};
`;

interface Props {
	children: JSX.Element | Array<JSX.Element>;
	padding?: string;
	width?: string;
	maxWidth?: string;
}

const ModalContainer = (props: Props): JSX.Element => {
	const { children, padding, width, maxWidth } = props;

	return (
		<Container padding={padding} width={width} maxWidth={maxWidth}>
			{children}
		</Container>
	);
};

export default ModalContainer;
