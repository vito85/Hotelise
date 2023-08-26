import { ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
	value: string | number;
	onChange: (value: string | number) => void;
	type?: string;
	placeholder?: string;
	leftContainer?: JSX.Element;
	rightContainer?: JSX.Element;
}

interface InputProps {
	leftContainer?: JSX.Element;
	rightContainer?: JSX.Element;
}

const Container = styled.div`
	height: 60px;
	width: 100%;
	background: #757575;
	border-radius: 55px;
	display: flex;
`;

const InputComponent = styled.input<InputProps>`
	height: 100%;
	width: 100%;
	background: #757575;
	border-radius: 55px;
	border: none;
	color: rgba(255, 255, 255, 0.9);
	font-size: 16px;
	padding-left: ${(props) => (props.leftContainer ? 0 : "24px")};
	padding-right: ${(props) => (props.rightContainer ? 0 : "24px")};
	outline: none;

	::placeholder,
	::-webkit-input-placeholder {
		color: rgba(255, 255, 255, 0.9);
	}
	:-ms-input-placeholder {
		color: rgba(255, 255, 255, 0.9);
	}
`;

const Input = (props: Props): JSX.Element => {
	const { value, onChange, type, placeholder, leftContainer, rightContainer } =
		props;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;

		onChange(newValue);
	};

	return (
		<Container>
			{leftContainer}
			<InputComponent
				value={value}
				onChange={handleChange}
				type={type || "text"}
				placeholder={placeholder}
				rightContainer={rightContainer}
				leftContainer={leftContainer}
			/>
			{rightContainer}
		</Container>
	);
};

export default Input;
