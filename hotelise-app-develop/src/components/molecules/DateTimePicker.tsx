import styled from "styled-components";
import Picker from "react-datetime-picker/dist/entry.nostyle";
import dayjs from "dayjs";
// import { CSSProperties } from "react";

interface Props {
	onChange: any;
	dateTime: any;
	dark?: boolean;
	borderedLeft?: boolean;
	borderedRight?: boolean;
	format?: string;
	hideClearIcon?: boolean;
	hideCalendarIcon?: boolean;
	withoutPaddings?: boolean;
	low?: boolean;
}

interface ContainerProps {
	isLow?: boolean;
}

const Container = styled.div<ContainerProps>`
	width: 100%;
	height: ${(props) => (props.isLow ? "30px" : "60px")};
	background: #ffffff;
	border-radius: 76px;
	display: flex;
	justify-content: center;
	border-radius: 55px;
`;

const DateTimePicker = (props: Props): JSX.Element => {
	const {
		onChange,
		dateTime,
		dark,
		borderedLeft,
		borderedRight,
		format,
		hideClearIcon,
		hideCalendarIcon,
		withoutPaddings,
		low,
	} = props;

	const pickerProps = {} as {
		value?: Date;
		clearIcon?: any;
		calendarIcon?: any;
	};

	if (dateTime) {
		pickerProps.value = dayjs(dateTime).toDate();
	}

	if (hideClearIcon) {
		pickerProps.clearIcon = null;
	}

	if (hideCalendarIcon) {
		pickerProps.calendarIcon = null;
	}

	return (
		<Container isLow={Boolean(low)}>
			<Picker
				className={[
					`react-datetime-picker--${dark ? "dark" : "light"}`,
					borderedLeft ? "react-datetime-picker--borderedLeft" : null,
					borderedRight ? "react-datetime-picker--borderedRight" : null,
					borderedRight ? "react-datetime-picker--borderedRight" : null,
					withoutPaddings ? "react-datetime-picker--withoutPaddings" : null,
					low ? "react-datetime-picker--low" : null,
				].join(" ")}
				onChange={onChange}
				showLeadingZeros
				format={format || "dd/MM/y"}
				{...pickerProps}
			/>
		</Container>
	);
};

export default DateTimePicker;
