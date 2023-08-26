import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ComplexFilterPanel, ExpensesList } from "components/organisms";

import {
	getExpenses,
	getExpensesFilter,
	setExpensesFilter,
} from "state/modules/expenses";
import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";
import { defaultExpensesDateFilter } from "utils/expenses";
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
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	overflow-y: auto;
`;

const FiltersContainer = styled.div`
	margin-bottom: 15px;
	z-index: 10;
	position: relative;
	padding: 0 30px;
`;

const ExpensesPage = () => {
	const filters = useSelector(getExpensesFilter);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getExpenses());
	}, [dispatch]);

	const handleChangeFilter = (updatedFilter: ComplexFilterItem) => {
		const updatedFilters = filters.map((filter: ComplexFilterItem) => {
			if (filter.type === updatedFilter.type) {
				return updatedFilter;
			}

			return filter;
		});

		dispatch(setExpensesFilter(updatedFilters));
		dispatch(getExpenses());
	};

	const handleCreateFilter = (filter: ComplexFilterItem) => {
		const updatedFilters = [...filters, filter];

		dispatch(setExpensesFilter(updatedFilters));
	};

	const handleDeleteFilter = (selectedfilter: ComplexFilterItem) => {
		// let updatedFilters = [...filters] as ComplexFilterItem[];

		// if (selectedfilter.type === ComplexFilterType.DATE) {
		// 	updatedFilters = updatedFilters.map((item) => {
		// 		if (item.type === ComplexFilterType.DATE) {
		// 			return {
		// 				...item,
		// 				value: defaultExpensesDateFilter,
		// 			};
		// 		}

		// 		return item;
		// 	});
		// } else {
		// 	updatedFilters = filters.filter(
		// 		(filter: ComplexFilterItem) => filter.type !== selectedfilter.type
		// 	);
		// }
		const updatedFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type !== selectedfilter.type
		);

		dispatch(setExpensesFilter(updatedFilters));

		if (selectedfilter.value) {
			dispatch(getExpenses());
		}
	};

	const handleClearFilter = () => {
		const filteredFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type === ComplexFilterType.DATE
		);

		const updatedFilters = filteredFilters.map((item) => ({
			type: ComplexFilterType.DATE,
			value: {
				...defaultExpensesDateFilter,
			},
		})) as ComplexFilterItem[];

		dispatch(setExpensesFilter(updatedFilters));
		dispatch(getExpenses());
	};

	return (
		<Container>
			<Title>Expenses</Title>
			<FiltersContainer>
				<ComplexFilterPanel
					filters={filters}
					onChange={handleChangeFilter}
					onCreate={handleCreateFilter}
					onDelete={handleDeleteFilter}
					onClear={handleClearFilter}
					options={[ComplexFilterType.PROPERTY_ID, ComplexFilterType.DATE]}
				/>
			</FiltersContainer>
			<ExpensesList showProperty />
		</Container>
	);
};

export default ExpensesPage;
