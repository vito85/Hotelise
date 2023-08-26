import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import { CSSProperties } from "react";

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
	selectedProperty: Option | null;
	onSelect: (option: Option) => void;
	properties: Option[];
}

const PropertySelect = (props: Props) => {
	const { selectedProperty, onSelect, properties } = props;

	const handleSelect = (
		data: SingleValue<{ label: string; value: string }>
	) => {
		if (data) {
			onSelect(data);
		}
	};

	return (
		<Container>
			<Title>Property</Title>
			<Select
				value={
					selectedProperty
						? {
								label: selectedProperty.label,
								value: selectedProperty.value,
						  }
						: null
				}
				onChange={handleSelect}
				placeholder="All"
				styles={
					{
						container: (containerStyles: CSSProperties) => ({
							...containerStyles,
							width: 250,
						}),
					} as any
				}
				options={[
					{
						label: "All",
						value: "",
					},
					...properties,
				]}
			/>
		</Container>
	);
};

export default PropertySelect;
