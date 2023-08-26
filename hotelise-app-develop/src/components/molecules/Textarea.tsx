import { ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
	value: string | number;
	onChange: (value: string | number) => void;
	placeholder?: string;
	leftContainer?: JSX.Element;
	rightContainer?: JSX.Element;
}

interface TextareaProps {
	leftContainer?: JSX.Element;
	rightContainer?: JSX.Element;
}

const Container = styled.div`
	min-height: 60px;
	width: 100%;
	background: #757575;
	border-radius: 26px;
	display: flex;
`;

const TextareaComponent = styled.textarea<TextareaProps>`
	min-height: 100px;
	width: 100%;
	background: #757575;
	border-radius: 55px;
	border: none;
	color: rgba(255, 255, 255, 0.9);
	font-size: 16px;
	padding-left: ${(props) => (props.leftContainer ? 0 : "24px")};
	padding-right: ${(props) => (props.rightContainer ? 0 : "24px")};
	padding-top: 15px;
	padding-bottom: 10px;
	outline: none;
	resize: none;

	::placeholder,
	::-webkit-input-placeholder {
		color: rgba(255, 255, 255, 0.9);
	}
	:-ms-input-placeholder {
		color: rgba(255, 255, 255, 0.9);
	}
`;

const Textarea = (props: Props): JSX.Element => {
	const { value, onChange, placeholder, leftContainer, rightContainer } = props;

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = event.target.value;

		onChange(newValue);
	};

	return (
		<Container>
			{leftContainer}
			<TextareaComponent
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				rightContainer={rightContainer}
				leftContainer={leftContainer}
			/>
			{rightContainer}
		</Container>
	);
};

export default Textarea;
