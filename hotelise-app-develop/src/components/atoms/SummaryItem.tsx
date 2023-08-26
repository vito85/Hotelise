import styled from "styled-components";

const Container = styled.div`
	background: #fff;
	padding: 15px 20px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.p`
	font-size: 18px;
	margin-bottom: 25px;
	font-family: "Open Sans Medium", sans-serif;
`;

const Value = styled.p`
	font-size: 24px;
	bottom: 50%;
`;

interface Props {
	value: number | string;
	title: string;
}

const SummaryItem = (props: Props) => {
	const { value, title } = props;

	return (
		<Container>
			<Title>{title}</Title>
			<Value>{value}</Value>
		</Container>
	);
};

export default SummaryItem;
