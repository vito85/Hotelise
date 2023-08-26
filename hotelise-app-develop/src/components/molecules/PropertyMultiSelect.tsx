// eslint-disable-next-line
import { useState, useEffect } from 'react';
import styled from "styled-components";
import Select from "react-select";
// eslint-disable-next-line
import { CSSProperties } from 'react';

const Container = styled.div`
	display: flex;
	align-items: center;
	margin-right: 35px;
`;

const Title = styled.p`
	margin-right: 10px;
`;

interface Option {
	label: string;
	value: string;
}

interface Props {
	selectedProperties: Option[] | null;
	onSelect: (options: Option[]) => void;
	properties: Option[];
}
const PropertySelect = (props: Props) => {
	const { onSelect, properties } = props;

	const allDefault: Option = { label: "All", value: "" };
	const [selectedProperties, setSelectedProperties] = useState<Option[]>([
		allDefault,
	]);

	useEffect(() => {
		onSelect([allDefault]);
	}, []);

	const handleSelect = (data: any) => {
		if (data) {
			setSelectedProperties(data);
			onSelect(data);
		} else {
			setSelectedProperties([]);
			onSelect([]);
		}
	};

	return (
		<Container>
			<Title>Property</Title>
			<Select
				value={selectedProperties}
				onChange={handleSelect}
				placeholder="select property"
				styles={
					{
						container: (containerStyles: CSSProperties) => ({
							...containerStyles,
							width: 250,
						}),
					} as any
				}
				options={[allDefault, ...properties]}
				isMulti
				closeMenuOnSelect={false}
			/>
		</Container>
	);
};

export default PropertySelect;
