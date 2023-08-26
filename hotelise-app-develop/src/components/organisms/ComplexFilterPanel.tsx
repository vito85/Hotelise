import styled from "styled-components";

import { Filters, SearchInput } from "components/molecules";

import {
	ComplexFilterItem,
	ComplexFilterType,
	SearchComplexFilter,
} from "interfaces/filters";

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	padding: 15px 0;
	position: relative;
`;

interface Props {
	filters: ComplexFilterItem[];
	onChange: (filter: ComplexFilterItem) => void;
	onCreate: (filter: ComplexFilterItem) => void;
	onDelete: (filter: ComplexFilterItem) => void;
	onClear: () => void;
	searchPlaceholder?: string;
	hideSearch?: boolean;
	options: ComplexFilterType[];
}

const ComplexFilterPanel = (props: Props): JSX.Element => {
	const {
		filters,
		onChange,
		searchPlaceholder,
		onDelete,
		onCreate,
		onClear,
		options,
	} = props;

	const renderSearch = () => {
		const searchFilter = filters.find(
			(filter: ComplexFilterItem) => filter.type === ComplexFilterType.SEARCH
		) as SearchComplexFilter;

		return searchFilter ? (
			<SearchInput
				filterData={searchFilter}
				changeFilter={onChange}
				placeholder={searchPlaceholder || ""}
			/>
		) : null;
	};

	return (
		<Container>
			<Filters
				filters={filters}
				changeFilter={onChange}
				onDelete={onDelete}
				onCreate={onCreate}
				onClear={onClear}
				options={options}
			/>
			{renderSearch()}
		</Container>
	);
};

export default ComplexFilterPanel;
