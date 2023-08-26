import { useState, CSSProperties, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Select from "react-select";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_BOLD } from "styles/typography";

import { selectComponentStyles } from "utils/selectStyles";
import { dateFilterTypes } from "utils/filters";
import {
	DateFilterOptionValue,
	DateRangeFilter,
	DateFilterType,
} from "interfaces/filters";
import { DateTimePicker } from "components/molecules";

interface Props {
	onApply: (params: DateRangeFilter) => void;
	onReset: () => void;
	defaultDateRange: DateRangeFilter;
	dateRange: DateRangeFilter;
	format?: string;
	hasTypes?: boolean;
}

interface ActionButtonProps {
	left?: boolean;
	right?: boolean;
	apply?: boolean;
	cancel?: boolean;
}

const RangeContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1px;
	width: 100%;
`;

const Container = styled.div`
	background: rgba(255, 255, 255, 0.7);
	box-shadow: 1px 3px 14px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(20px);
	border-radius: 15px;
	padding: 20px 30px;
	min-width: 320px;
	position: relative;
	z-index: 5;
`;

const Title = styled.p`
	font-family: "Open Sans Medium";
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
	margin-bottom: 15px;
`;

const Actions = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1px;
	margin-top: 25px;
`;

const ActionButton = styled.button<ActionButtonProps>`
	display: flex;
	height: 40px;
	justify-content: center;
	align-items: center;
	border-top-left-radius: ${(props) => (props.left ? "109px" : 0)};
	border-bottom-left-radius: ${(props) => (props.left ? "109px" : 0)};
	border-top-right-radius: ${(props) => (props.right ? "109px" : 0)};
	border-bottom-right-radius: ${(props) => (props.right ? "109px" : 0)};
	border: none;
	background-color: ${(props) =>
		props.apply ? MAIN_THEME.GREY_DARK : MAIN_THEME.GREY_DARK_SECOND};
	color: #ffffff;
	font-family: ${FONT_FAMILY_BOLD};
	font-size: 18px;
	cursor: pointer;
`;

const FilterTypesContainer = styled.div`
	display: grid;
	gap: 1px;
	margin-top: 25px;
	margin-bottom: 25px;
	border-radius: 55px;
`;

interface SelectOption {
	value: DateFilterType;
	label: string;
}

const DateRangePicker = (props: Props): JSX.Element => {
	const { onApply, onReset, defaultDateRange, dateRange, format, hasTypes } =
		props;

	const [dateFrom, setDateFrom] = useState(dateRange.dateFrom);
	const [dateTo, setDateTo] = useState(dateRange.dateTo);
	const [dateFromType, setDateFromType] = useState(dateFilterTypes[1]);
	const [dateToType, setDateToType] = useState(dateFilterTypes[1]);
	const [selectedDateOption, setSelectedDateOption] = useState<any>();
	const [options, setOptions] = useState<any>([]);
	const [applyFilter, setApplyFilter] = useState(false);

	useEffect(() => {
		const numberOfMonths = dayjs().get("month");

		const months = [];
		const years = [
			{
				label: `${dayjs().year()} (Current)`,
				value: {
					dateFrom: dayjs().startOf("year").toISOString(),
					dateTo: dayjs().endOf("year").toISOString(),
				},
			},
			{
				label: `${dayjs().subtract(1, "year").year()}`,
				value: {
					dateTo: dayjs().subtract(1, "year").endOf("year").toISOString(),
					dateFrom: dayjs().subtract(1, "year").startOf("year").toISOString(),
				},
			},
		];

		for (let index = 0; index <= numberOfMonths; index++) {
			months.push({
				label: `${dayjs().month(index).format("MMM")} ${dayjs().year()} ${
					index === numberOfMonths ? "(Current)" : ""
				}`,
				value: {
					dateFrom: dayjs().month(index).startOf("month").toISOString(),
					dateTo: dayjs().month(index).endOf("month").toISOString(),
				},
			});
		}

		const optionsArray = [
			{
				label: "Custom",
				value: DateFilterOptionValue.CUSTOM,
			},
			{
				label: "Year",
				options: years,
			},
		];

		if (months.length) {
			optionsArray.push({
				label: "Months",
				options: months.reverse(),
			});
		}

		const selectedMonthOption = months.find(
			(month) =>
				month.value.dateFrom === dateRange.dateFrom &&
				month.value.dateTo === dateRange.dateTo
		);

		const selectedYearOption = years.find(
			(year) =>
				year.value.dateFrom === dateRange.dateFrom &&
				year.value.dateTo === dateRange.dateTo
		);

		setOptions(optionsArray);

		if (selectedMonthOption) {
			setSelectedDateOption(selectedMonthOption);
		} else if (selectedYearOption) {
			setSelectedDateOption(selectedYearOption);
		}
	}, [dateRange]);

	useEffect(() => {
		if (applyFilter) {
			onApply({
				dateTo,
				dateFrom,
				dateFromType: dateFromType.value,
				dateToType: dateToType.value,
			});
			setApplyFilter(false);
		}
	}, [applyFilter]);

	const handleApply = () => {
		setApplyFilter(true);
	};

	const handleChangeDateFrom = (newDate: any) => {
		setDateFrom(
			newDate ? dayjs(newDate).toISOString() : defaultDateRange.dateFrom
		);
	};

	const handleChangeDateTo = (newDate: any) => {
		setDateTo(newDate ? dayjs(newDate).toISOString() : defaultDateRange.dateTo);
	};

	const handleReset = () => {
		setDateFrom(defaultDateRange.dateFrom);
		setDateTo(defaultDateRange.dateTo);

		onReset();
	};

	const changeDateFromType = (value: SelectOption | null) => {
		if (value) {
			setDateFromType(value);
			setDateToType(value);
		}
	};

	const handleChangeDateFilter = (option: any) => {
		setSelectedDateOption(option);

		if (option.value !== DateFilterOptionValue.CUSTOM) {
			handleChangeDateFrom(option.value.dateFrom);
			handleChangeDateTo(option.value.dateTo);
			setApplyFilter(true);
		}
	};

	const renderSelect = () => (
		<Select
			value={selectedDateOption}
			onChange={handleChangeDateFilter}
			styles={{
				...selectComponentStyles,
				container: (containerStyles: CSSProperties) => ({
					...containerStyles,
					width: "100%",
					backgroundColor: MAIN_THEME.GREY_LIGHT,
					height: 44,
					paddingLeft: 16,
					paddingRight: 16,
					borderRadius: 55,
				}),
				placeholder: (pleceholderStyles: CSSProperties) => ({
					...pleceholderStyles,
					color: "#ffffff",
				}),
			}}
			options={options}
		/>
	);

	const renderApplyButton = () => (
		<ActionButton
			right
			apply
			type="submit"
			onClick={handleApply}
			disabled={!selectedDateOption}
		>
			Apply
		</ActionButton>
	);

	const renderResetButton = () => (
		<ActionButton left cancel onClick={handleReset}>
			Reset
		</ActionButton>
	);
	const renderTypes = () =>
		hasTypes && selectedDateOption?.value === DateFilterOptionValue.CUSTOM ? (
			<FilterTypesContainer>
				<Select
					value={dateFromType}
					onChange={changeDateFromType}
					styles={{
						...selectComponentStyles,
						container: (containerStyles: CSSProperties) => ({
							...containerStyles,
							width: "100%",
							backgroundColor: MAIN_THEME.GREY_LIGHT,
							height: 44,
							paddingLeft: 16,
							paddingRight: 16,
							borderRadius: 55,
						}),
						placeholder: (pleceholderStyles: CSSProperties) => ({
							...pleceholderStyles,
							color: "#ffffff",
						}),
					}}
					options={dateFilterTypes}
				/>
			</FilterTypesContainer>
		) : null;

	const renderDateRangePicker = () => {
		if (selectedDateOption?.value === DateFilterOptionValue.CUSTOM) {
			return (
				<>
					<Title>Between:</Title>
					<RangeContainer>
						<DateTimePicker
							onChange={handleChangeDateFrom}
							dateTime={dateFrom}
							borderedLeft
							format={format}
						/>
						<DateTimePicker
							onChange={handleChangeDateTo}
							dateTime={dateTo}
							borderedRight
							format={format}
						/>
					</RangeContainer>
					<Actions>
						{renderResetButton()}
						{renderApplyButton()}
					</Actions>
				</>
			);
		}
	};

	return (
		<Container>
			{renderSelect()}
			{renderTypes()}
			{renderDateRangePicker()}
		</Container>
	);
};

export default DateRangePicker;
