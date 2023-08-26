import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ComplexFilterPanel, StatementsList } from "components/organisms";

import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";

import {
	getStatements,
	getStatementsFilter,
	setStatementsFilter,
} from "state/modules/statements";
import { defaultStatementsDateFilter } from "utils/statements";
import { FONT_FAMILY_BOLD, FONT_WEIGHT_BOLD } from "styles/typography";
import { MAIN_THEME } from "styles/colors";

const Title = styled.p`
	font-size: 26px;
	font-family: ${FONT_FAMILY_BOLD};
	font-weight: ${FONT_WEIGHT_BOLD};
	color: ${MAIN_THEME.GREY_DARK};
	padding: 20px;
`;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	overflow: auto;
`;

const FiltersContainer = styled.div`
	margin-bottom: 15px;
	z-index: 10;
	position: relative;
	padding: 0 20px;
`;

const StatementsPage = () => {
	const filters = useSelector(getStatementsFilter);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			getStatements({
				isLoadMore: false,
			})
		);
	}, []);

	const handleChangeFilter = (updatedFilter: ComplexFilterItem) => {
		const updatedFilters = filters.map((filter: ComplexFilterItem) => {
			if (filter.type === updatedFilter.type) {
				return updatedFilter;
			}

			return filter;
		});

		dispatch(setStatementsFilter(updatedFilters));
		dispatch(getStatements({}));
	};

	const handleCreateFilter = (filter: ComplexFilterItem) => {
		const updatedFilters = [...filters, filter];

		dispatch(setStatementsFilter(updatedFilters));
	};

	const handleDeleteFilter = (selectedfilter: ComplexFilterItem) => {
		const updatedFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type !== selectedfilter.type
		);

		dispatch(setStatementsFilter(updatedFilters));

		if (selectedfilter.value) {
			dispatch(getStatements({}));
		}
	};

	const handleClearFilter = () => {
		const filteredFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type === ComplexFilterType.DATE
		);

		const updatedFilters = filteredFilters.map((item) => ({
			type: ComplexFilterType.DATE,
			value: {
				...defaultStatementsDateFilter,
			},
		})) as ComplexFilterItem[];

		dispatch(setStatementsFilter(updatedFilters));
		dispatch(getStatements({}));
	};

	return (
		<Container>
			<Title>Statements</Title>
			<FiltersContainer>
				<ComplexFilterPanel
					filters={filters}
					onChange={handleChangeFilter}
					onCreate={handleCreateFilter}
					onDelete={handleDeleteFilter}
					onClear={handleClearFilter}
					options={[ComplexFilterType.PROPERTY_ID]}
				/>
			</FiltersContainer>
			<StatementsList showProperty />
		</Container>
	);
};

export default memo(StatementsPage);
