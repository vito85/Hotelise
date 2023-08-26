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
	margin-top: auto;
	bottom: 50%;
`;

const Value2 = styled.p`
	font-size: 12px;
	margin-top: 10px;
	color: GREY;
`;

interface Props {
	value: number | string;
	value1: number | string;
	value2: number | string;
	title: string;
}

const SummaryItemThreeValues = (props: Props) => {
	const { value, title, value1, value2 } = props;

	return (
		<Container>
			<Title>{title}</Title>
			<Value>{value}</Value>
			<Value2>{value1}</Value2>
			<Value2>{value2}</Value2>
		</Container>
	);
};

export default SummaryItemThreeValues;
