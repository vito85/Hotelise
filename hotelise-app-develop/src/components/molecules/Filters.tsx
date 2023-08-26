import { useMemo } from "react";
import styled from "styled-components";

import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";

import { AddNewFilterButton, FilterTag } from "components/molecules";
import { ClearFiltersButton } from "components/atoms";

const FiltersContaner = styled.div`
	display: flex;

	& > div {
		margin-right: 10px;
	}
`;

const AddNewFilterButtonContainer = styled.div`
	margin-right: 10px;
`;

const Container = styled.div`
	display: flex;
`;

interface Props {
	filters: ComplexFilterItem[];
	changeFilter: (filter: ComplexFilterItem) => void;
	onCreate: (filter: ComplexFilterItem) => void;
	onDelete: (filter: ComplexFilterItem) => void;
	onClear: () => void;
	options: ComplexFilterType[];
}

const Filters = (props: Props): JSX.Element => {
	const { filters, changeFilter, onCreate, onDelete, onClear, options } = props;

	const handleCreateFilter = (filterType: ComplexFilterType) => {
		onCreate({
			type: filterType,
			value: null,
		});
	};

	const handleDelete = (type: ComplexFilterType) => {
		const selectedFilter = filters.find(
			(filter: ComplexFilterItem) => filter.type === type
		);

		if (selectedFilter) {
			onDelete(selectedFilter);
		}
	};

	const filteredOptions = useMemo(() => {
		const filtersKeys = filters.map(
			(filter) => filter.type
		) as ComplexFilterType[];

		return options.filter((option) => !filtersKeys.includes(option));
	}, [filters, options]);

	const filteredFilters = useMemo(
		() =>
			filters.filter(
				(filter: ComplexFilterItem) => filter.type !== ComplexFilterType.SEARCH
			),
		[filters]
	);

	const renderAddNewFilterButton = () =>
		filteredOptions.length ? (
			<AddNewFilterButtonContainer>
				<AddNewFilterButton
					onCreate={handleCreateFilter}
					options={filteredOptions}
				/>
			</AddNewFilterButtonContainer>
		) : null;

	const renderClearButton = () =>
		filteredFilters.length ? <ClearFiltersButton onClick={onClear} /> : null;

	const renderFilters = () => {
		if (filteredFilters.length) {
			return (
				<FiltersContaner>
					{filteredFilters.map((filter: ComplexFilterItem) => (
						<FilterTag
							onDelete={handleDelete}
							onChange={changeFilter}
							key={filter.type}
							filter={filter}
						/>
					))}
				</FiltersContaner>
			);
		}
	};

	return (
		<Container>
			{renderFilters()}
			{renderAddNewFilterButton()}
			{renderClearButton()}
		</Container>
	);
};

export default Filters;
