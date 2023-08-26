import styled from "styled-components";
import PhoneInput from "react-phone-number-input";

const Container = styled.div`
	height: 60px;
	width: 100%;
	background: #757575;
	border-radius: 55px;
	display: flex;
`;

interface Props {
	value: string;
	onChange: (value: string) => void;
}

const PhoneNumberInput = (props: Props): JSX.Element => {
	const { value, onChange } = props;

	return (
		<Container>
			<PhoneInput
				className="PhoneInput"
				placeholder="Phone Number"
				value={value}
				onChange={onChange}
			/>
		</Container>
	);
};

export default PhoneNumberInput;
