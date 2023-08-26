import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
	clearPropertyDetails,
	getPropertyDetails,
	getPropertyDetailsInfo,
	getPropertyExpenses,
	getPropertyReservations,
	getPropertyStatements,
} from "state/modules/properties";

import { PropertyInfo, PropertiesDetailsTabs } from "components/molecules";

import {
	PropertyReservationsList,
	PropertyExpensesList,
	PropertyDetailsFilters,
	PropertyStatementsList,
	PropertyDetails,
} from "components/organisms";

import { propertyContentTabs } from "utils/properties";
import { PropertyTab, PropertyTabValue } from "interfaces/properties";

const TabsFiltersContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 70px 15px;
`;

const ListContainer = styled.div``;

const Container = styled.div`
	width: 100%;
	padding: 45px 0;
	height: 100vh;
	position: relative;
	overflow-y: auto;
`;

const DetailsContainer = styled.div`
	margin-bottom: 34px;
	padding: 0 0 0 70px;
`;

const PropertyDetailsPage = (): JSX.Element => {
	const [currentTab, setTab] = useState(propertyContentTabs[0]);

	const params = useParams() as any;

	const propertyDetails = useSelector(getPropertyDetailsInfo);

	const dispatch = useDispatch();

	const propertyId = useMemo(() => params.id, [params]);

	useEffect(() => {
		if (propertyId) {
			dispatch(getPropertyDetails(propertyId));
			dispatch(getPropertyReservations(propertyId));
			dispatch(getPropertyExpenses(propertyId));
			dispatch(
				getPropertyStatements({
					propertyId,
				})
			);
		}

		return () => {
			dispatch(clearPropertyDetails());
		};
	}, [propertyId, dispatch]);

	const handleChangeTab = (tab: PropertyTab) => {
		setTab(tab);
	};

	const renderDetails = (): JSX.Element =>
		propertyDetails ? (
			<DetailsContainer>
				<PropertyInfo data={propertyDetails} />
			</DetailsContainer>
		) : (
			<></>
		);

	const renderTabContent = () => {
		if (currentTab.value === PropertyTabValue.RESERVATIONS && propertyDetails) {
			return <PropertyReservationsList propertyDetails={propertyDetails} />;
		}
		if (currentTab.value === PropertyTabValue.EXPENSES) {
			return <PropertyExpensesList propertyId={propertyId} />;
		}
		if (currentTab.value === PropertyTabValue.STATEMENTS) {
			return <PropertyStatementsList propertyId={propertyId} />;
		}
		if (currentTab.value === PropertyTabValue.DETAILS) {
			return <PropertyDetails />;
		}
	};

	const renaderTabsAndFilters = () => (
		<TabsFiltersContainer>
			<PropertiesDetailsTabs
				curentTab={currentTab}
				changeActiveTab={handleChangeTab}
			/>
			{currentTab.value !== PropertyTabValue.REPORT ? (
				<PropertyDetailsFilters
					propertyId={propertyId}
					curentTab={currentTab}
				/>
			) : null}
		</TabsFiltersContainer>
	);

	return (
		<Container id="propertyDetailsListContainer">
			{renderDetails()}
			{renaderTabsAndFilters()}
			<ListContainer>{renderTabContent()}</ListContainer>
		</Container>
	);
};

export default PropertyDetailsPage;
