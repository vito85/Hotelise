import styled from "styled-components";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FilterButton } from "components/atoms";
import { DateRangePicker } from "components/molecules";

import {
	getPropertyDetailsFilters,
	getPropertyExpenses,
	getPropertyReservations,
	setPropertyDetailsFilter,
} from "state/modules/properties";

import { useOnClickOutside } from "hooks/useOnClickOutside";
import { defaultPropertyDetailsFilters } from "utils/properties";
import { PropertyTab } from "interfaces/properties";
import { DateRangeFilter } from "interfaces/filters";

const DateRangePickerContainer = styled.div`
	position: absolute;
	right: 0;
	top: 45px;
	z-index: 10;
`;

const Container = styled.div`
	position: relative;
`;

interface Props {
	propertyId: string;
	curentTab: PropertyTab;
}

const PropertyDetailsFilters = (props: Props): JSX.Element => {
	const [isFiltersVisible, setFiltersVisible] = useState(false);

	const dateRange = useSelector(getPropertyDetailsFilters);
	const containerRef = useRef(null);

	const { propertyId, curentTab } = props;

	const dispatch = useDispatch();

	const hideFilters = () => {
		setFiltersVisible(false);
	};

	const handleApply = ({
		dateFromType,
		dateToType,
		dateTo,
		dateFrom,
	}: DateRangeFilter) => {
		dispatch(
			setPropertyDetailsFilter({
				dateTo,
				dateFrom,
				dateFromType,
				dateToType,
			})
		);

		dispatch(getPropertyExpenses(propertyId));
		dispatch(getPropertyReservations(propertyId));
		hideFilters();
	};

	const handleReset = () => {
		dispatch(
			setPropertyDetailsFilter({
				...defaultPropertyDetailsFilters,
			})
		);

		dispatch(getPropertyExpenses(propertyId));
		dispatch(getPropertyReservations(propertyId));
	};

	const toggleFilters = () => {
		setFiltersVisible(!isFiltersVisible);
	};

	useOnClickOutside(containerRef, () => {
		hideFilters();
	});

	const renderFilters = () =>
		isFiltersVisible ? (
			<DateRangePickerContainer>
				<DateRangePicker
					onApply={handleApply}
					onReset={handleReset}
					defaultDateRange={defaultPropertyDetailsFilters}
					dateRange={dateRange}
					hasTypes
					format="dd/MM/y"
				/>
			</DateRangePickerContainer>
		) : null;

	return (
		<Container ref={containerRef}>
			<FilterButton onClick={toggleFilters} dateRange={dateRange} />
			{renderFilters()}
		</Container>
	);
};

export default PropertyDetailsFilters;
