import styled from "styled-components";

import { DateRangePicker } from "components/molecules";
import {
	DateRangeFilter,
	ComplexFilterItem,
	ComplexFilterType,
} from "interfaces/filters";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useRef, useState } from "react";
import { defaultReservationsDateFilter } from "utils/reservations";
import dayjs from "dayjs";

const DateRangePickerContainer = styled.div`
	position: absolute;
	left: 0;
	top: 45px;
	z-index: 10;
`;

interface Props {
	onClose: () => void;
	onChange: (filter: ComplexFilterItem) => void;
}

const ReservationsDateFilter = (props: Props): JSX.Element => {
	const [dateRange, setDateRange] = useState(defaultReservationsDateFilter);

	const { onClose, onChange } = props;

	const ref = useRef(null);

	useOnClickOutside(ref, () => {
		onClose();
	});

	const handleReset = () => {
		onChange({
			type: ComplexFilterType.DATE,
			value: null,
		});

		setDateRange(defaultReservationsDateFilter);

		onClose();
	};

	const handleApply = (filter: DateRangeFilter) => {
		setDateRange(filter);

		onChange({
			type: ComplexFilterType.DATE,
			value: filter as DateRangeFilter,
			title: `${dayjs(filter.dateFrom).format("DD/MM/YYYY")} - ${dayjs(
				filter.dateTo
			).format("DD/MM/YYYY")}`,
		});

		onClose();
	};

	return (
		<DateRangePickerContainer ref={ref}>
			<DateRangePicker
				onApply={handleApply}
				onReset={handleReset}
				defaultDateRange={defaultReservationsDateFilter}
				dateRange={dateRange}
				hasTypes
				format="dd/MM/y"
			/>
		</DateRangePickerContainer>
	);
};

export default ReservationsDateFilter;
