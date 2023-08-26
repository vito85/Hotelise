import styled from "styled-components";
import dayjs from "dayjs";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DateTimePicker, PropertySelect } from "components/molecules";

import {
	ComplexFilterItem,
	ComplexFilterType,
	DateComplexFilter,
	PropertyIdsComplexFilter,
} from "interfaces/filters";

import {
	getDashboardFilter,
	getDashboardReport,
	getDashboardYearReport,
	setDashboardFilter,
} from "state/modules/dashboard";

import { Property } from "models/properties";
import PropertiesClient from "services/api/properties";
import PropertyMultiSelect from "../molecules/PropertyMultiSelect";

const DateDivider = styled.div`
	margin: 0 15px;
	font-size: 24px;
	display: flex;
	align-items: center;
`;

const FilterContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 35px;
`;

const FilterTitle = styled.p`
	margin-right: 10px;
`;

const DateRangeContainer = styled.div`
	display: flex;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 15px 0;
	position: relative;
	z-index: 10;
`;

const DashboardFilter = (): JSX.Element => {
	const [properties, setProperties] = useState<any[]>([]);

	const dispatch = useDispatch();

	useEffect(() => {
		const loadProperties = async () => {
			try {
				const res = (await PropertiesClient.getProperties({
					offset: 0,
					city: "",
					name: "",
				})) as AxiosResponse;

				const propertiesList = res.data.content as Property[];

				const transformedProperties = propertiesList.map((item) => ({
					label: item.name || "-",
					value: item.id,
				}));

				setProperties(transformedProperties);
			} catch (error) {
				console.log({ error });
			}
		};

		loadProperties();
	}, []);

	const filters = useSelector(getDashboardFilter);

	const dateFilter = useMemo(
		() => filters.find((item) => item.type === ComplexFilterType.DATE),
		[filters]
	) as DateComplexFilter;

	const propertyFilter = useMemo(
		() => filters.find((item) => item.type === ComplexFilterType.PROPERTY_ID),
		[filters]
	) as PropertyIdsComplexFilter;

	const selectedProperties = useMemo(
		() =>
			properties.filter((item) =>
				propertyFilter?.value
					? propertyFilter.value.includes(item.value)
					: false
			),
		[properties, propertyFilter]
	) as any;

	const handleChangeFilter = (updatedFilter: ComplexFilterItem) => {
		const updatedFilters = filters.map((filter: ComplexFilterItem) => {
			if (filter.type === updatedFilter.type) {
				return updatedFilter;
			}

			return filter;
		});

		dispatch(setDashboardFilter(updatedFilters));
		dispatch(getDashboardReport());

		if (updatedFilter.type === ComplexFilterType.PROPERTY_ID) {
			dispatch(getDashboardYearReport());
		}
	};

	const handleChangeDateFrom = (date: string) => {
		const updatedFilter = {
			...dateFilter,
			value: {
				...dateFilter.value,
				dateFrom: dayjs(date).toISOString(),
			},
		} as DateComplexFilter;

		handleChangeFilter(updatedFilter);
	};

	const handleChangeDateTo = (date: string) => {
		const updatedFilter = {
			...dateFilter,
			value: {
				...dateFilter.value,
				dateTo: dayjs(date).toISOString(),
			},
		} as DateComplexFilter;

		handleChangeFilter(updatedFilter);
	};

	const handleChangeProperty = (data: { label: string; value: string }[]) => {
		const updatedFilter = {
			type: ComplexFilterType.PROPERTY_ID,
			value: data.map((item) => item.value),
		} as PropertyIdsComplexFilter;

		handleChangeFilter(updatedFilter);
	};

	return (
		<Container>
			<FilterContainer>
				<FilterTitle>Date</FilterTitle>
				<DateRangeContainer>
					<DateTimePicker
						onChange={handleChangeDateFrom}
						dateTime={dateFilter?.value?.dateFrom}
						format="dd/MM/y"
						borderedRight
						borderedLeft
						hideClearIcon
					/>
					<DateDivider>{`>`}</DateDivider>
					<DateTimePicker
						onChange={handleChangeDateTo}
						dateTime={dateFilter?.value?.dateTo}
						format="dd/MM/y"
						borderedRight
						borderedLeft
						hideClearIcon
					/>
				</DateRangeContainer>
			</FilterContainer>
			<PropertyMultiSelect
				properties={properties}
				onSelect={handleChangeProperty}
				selectedProperties={selectedProperties} // Update this prop
			/>
		</Container>
	);
};

export default DashboardFilter;
