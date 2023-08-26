import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { AxiosResponse } from "axios";

import { ListLoader } from "components/atoms";

import { Property } from "models/properties";

import PropertiesClient from "services/api/properties";

import { useOnClickOutside } from "hooks/useOnClickOutside";

import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";

const PropertyName = styled.p`
	color: #000000;
	text-align: left;
	text-transform: capitalize;
`;

const LoaderWrap = styled.div`
	display: flex;
	justify-content: center;
`;

const Container = styled.div`
	position: absolute;
	left: 0;
	top: 45px;
	z-index: 10;
	width: 200px;
	height: 250px;
	overflow: auto;
	background: rgba(255, 255, 255, 0.7);
	box-shadow: 1px 3px 14px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(20px);
	border-radius: 15px;
	padding: 10px 0;
`;

const PropertyListItem = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	outline: none;
	display: flex;
	align-items: center;
	padding: 5px 12px;

	&:hover {
		background-color: #f8f7f9;
	}
`;

const PropertiesList = styled(InfiniteScroll as any)`
	padding: 10px;
	height: 100%;
	width: 100%;
`;

interface Props {
	onClose: () => void;
	onChange: (filter: ComplexFilterItem) => void;
}

const ReservationsPropertyFilter = (props: Props): JSX.Element => {
	const [properties, setProperties] = useState<Property[]>([]);
	const [propertiesTotal, setPropertiesTotal] = useState(0);
	const [isPropertiesLoading, setPropertiesLoading] = useState(true);

	const { onClose, onChange } = props;

	const ref = useRef(null);

	useOnClickOutside(ref, () => {
		onClose();
	});

	const propertiesCount = useMemo(() => properties.length, [properties]);

	const loadProperties = async (offset: number) => {
		try {
			const res = (await PropertiesClient.getProperties({
				offset,
			})) as AxiosResponse;

			const { content, _metadata } = res.data;
			const { totalCount } = _metadata;

			return {
				properties: content,
				propertiesTotal: totalCount,
			};
		} catch (error) {
			console.log({ error });
			setPropertiesLoading(false);
		}
	};

	const getProperties = async () => {
		setPropertiesLoading(true);

		const propertiesRes = await loadProperties(0);

		if (propertiesRes) {
			setProperties(propertiesRes.properties);
			setPropertiesTotal(propertiesRes.propertiesTotal);
		}
	};

	useEffect(() => {
		getProperties();
	}, []);

	const hasMore = useMemo(
		() => propertiesCount < propertiesTotal,
		[propertiesCount, propertiesTotal]
	);

	const loadMore = async () => {
		const propertiesRes = await loadProperties(propertiesCount);

		if (propertiesRes) {
			const updatedProperties = [...properties, ...propertiesRes.properties];

			setProperties(updatedProperties);
		}
	};

	const handleClick = (property: Property) => {
		const nameWithoutDash = property.name.replaceAll("-", " ");
		const nameWithoutUnderscore = nameWithoutDash.replaceAll("_", " ");

		onChange({
			type: ComplexFilterType.PROPERTY_ID,
			value: property.id,
			title: nameWithoutUnderscore || "",
		});

		onClose();
	};

	const renderPropertyItem = (property: Property) => {
		const nameWithoutDash = property.name.replaceAll("-", " ");
		const nameWithoutUnderscore = nameWithoutDash.replaceAll("_", " ");

		return (
			<PropertyListItem key={property.id} onClick={() => handleClick(property)}>
				<PropertyName>{nameWithoutUnderscore}</PropertyName>
			</PropertyListItem>
		);
	};

	const renderLoader = () => (
		<LoaderWrap>
			<ListLoader />
		</LoaderWrap>
	);

	return (
		<Container id="propertiesContainer" ref={ref}>
			{isPropertiesLoading && !properties.length ? (
				renderLoader()
			) : (
				<PropertiesList
					scrollableTarget="propertiesContainer"
					dataLength={propertiesCount}
					next={loadMore}
					hasMore={hasMore}
					loader={
						<LoaderWrap>
							<ListLoader />
						</LoaderWrap>
					}
					style={{
						display: "flex",
						flexDirection: "column",
						padding: 0,
					}}
				>
					{properties.map((property: Property) => renderPropertyItem(property))}
				</PropertiesList>
			)}
		</Container>
	);
};

export default ReservationsPropertyFilter;
