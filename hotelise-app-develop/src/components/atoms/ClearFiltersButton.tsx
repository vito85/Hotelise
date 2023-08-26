import styled from "styled-components";

const Button = styled.div`
	padding: 0 12px;
	display: flex;
	transition: 0.25s ease all;
	cursor: pointer;
	height: 32px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: rgb(248, 247, 249);
	}
`;

const Container = styled.div`
	position: relative;
`;

interface Props {
	onClick: () => void;
}

const ClearFiltersButton = (props: Props): JSX.Element => {
	const { onClick } = props;

	return (
		<Container>
			<Button onClick={onClick}>Clear</Button>
		</Container>
	);
};

export default ClearFiltersButton;
