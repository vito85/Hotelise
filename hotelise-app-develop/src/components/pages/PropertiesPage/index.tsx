import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { PropertyCard } from "components/molecules";
import { ListLoader } from "components/atoms";
import { ComplexFilterPanel } from "components/organisms";

import {
	getProperties,
	getPropertiesCount,
	getPropertiesFilters,
	getPropertiesList,
	getPropertiesLoading,
	getPropertiesTotal,
	setPropertiesFilter,
} from "state/modules/properties";
import { Property } from "models/properties";
import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";
import {
	FONT_FAMILY_BOLD,
	FONT_FAMILY_MEDIUM,
	FONT_WEIGHT_BOLD,
} from "styles/typography";
import { MAIN_THEME } from "styles/colors";

const Header = styled.div`
	display: flex;
	padding: 22px 30px 50px;
`;

const Container = styled.div`
	overflow-y: auto;
	width: 100%;
`;

const PropertiesList = styled(InfiniteScroll as any)`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(auto-fit, 420px);
	gap: 75px;
	padding: 0 30px 100px;
`;

const PropertiesTable = styled.div`
	padding: 0 30px;

	overflow: hidden;
`;

const LoaderContainer = styled.div`
	padding: 0 30px;
`;

const Title = styled.p`
	font-size: 26px;
	font-family: ${FONT_FAMILY_BOLD};
	font-weight: ${FONT_WEIGHT_BOLD};
	color: ${MAIN_THEME.GREY_DARK};
	padding: 20px 30px;
`;

const TableHeaderItem = styled.div`
	font-size: 14px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 38px;
	color: #ffffff;
`;

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 0.25fr 0.35fr 1fr 0.5fr;
	gap: 1px;
	margin-bottom: 1px;
	border-top-right-radius: 16px;
	border-top-left-radius: 16px;
	overflow: hidden;
	/* padding: 0 30px; */
	margin: 0 30px;
	background: linear-gradient(
		90deg,
		#666 0%,
		#666 calc(100% - 0.05em),
		#ccc calc(100% - 0.05em),
		#ccc 100%
	);
`;

const EmptyListMessage = styled.p`
	font-family: ${FONT_FAMILY_MEDIUM};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	font-size: 16px;
	margin: 0 30px;
	padding: 15px 10px;
	background: #ffffff;
`;

const PropertiesPage = (): JSX.Element => {
	const propertiesList = useSelector(getPropertiesList);
	const propertiesCount = useSelector(getPropertiesCount);
	const propertiesTotal = useSelector(getPropertiesTotal);
	const isPropertiesLoading = useSelector(getPropertiesLoading);

	const filters = useSelector(getPropertiesFilters);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProperties());
	}, [dispatch]);

	const hasMore = useMemo(
		() => propertiesCount < propertiesTotal,
		[propertiesCount, propertiesTotal]
	);

	const loadMore = () => {
		if (!isPropertiesLoading) {
			dispatch(getProperties(true));
		}
	};

	const handleChangeFilter = (updatedFilter: ComplexFilterItem) => {
		const updatedFilters = filters.map((filter: ComplexFilterItem) => {
			if (filter.type === updatedFilter.type) {
				return updatedFilter;
			}

			return filter;
		});

		dispatch(setPropertiesFilter(updatedFilters));
		dispatch(getProperties());
	};

	const handleCreateFilter = (filter: ComplexFilterItem) => {
		const updatedFilters = [...filters, filter];

		dispatch(setPropertiesFilter(updatedFilters));
	};

	const handleDeleteFilter = (selectedfilter: ComplexFilterItem) => {
		const updatedFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type !== selectedfilter.type
		);

		dispatch(setPropertiesFilter(updatedFilters));
		dispatch(getProperties());
	};

	const handleClearFilter = () => {
		const updatedFilters = filters.filter(
			(filter: ComplexFilterItem) => filter.type === ComplexFilterType.SEARCH
		);

		dispatch(setPropertiesFilter(updatedFilters));
		dispatch(getProperties());
	};

	const renderLoader = () =>
		propertiesCount <= 0 && isPropertiesLoading ? (
			<LoaderContainer>
				<ListLoader />
			</LoaderContainer>
		) : null;

	const renderProperties = () => {
		if (!propertiesList.length && !isPropertiesLoading) {
			return <EmptyListMessage>Empty list</EmptyListMessage>;
		}

		return (
			<PropertiesTable>
				{propertiesList.map((property: Property) => (
					<PropertyCard key={property.id} data={property} />
				))}
			</PropertiesTable>
		);
	};

	return (
		<Container id="container">
			<Title>Properties</Title>
			<Header>
				<ComplexFilterPanel
					filters={filters}
					onChange={handleChangeFilter}
					onCreate={handleCreateFilter}
					onDelete={handleDeleteFilter}
					onClear={handleClearFilter}
					searchPlaceholder="Search for property name"
					options={[ComplexFilterType.SEARCH, ComplexFilterType.CITY]}
				/>
			</Header>

			<TableHeader>
				<TableHeaderItem>Image</TableHeaderItem>
				<TableHeaderItem>Name</TableHeaderItem>
				<TableHeaderItem>Address</TableHeaderItem>
				<TableHeaderItem>Details</TableHeaderItem>
			</TableHeader>
			{renderProperties()}
			{renderLoader()}
		</Container>
	);
};

export default PropertiesPage;
