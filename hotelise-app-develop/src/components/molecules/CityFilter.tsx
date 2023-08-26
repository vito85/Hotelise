import { CityComplexFilter, ComplexFilterType } from "interfaces/filters";
import { ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";

const Input = styled.input`
	border: none;
	background: transparent;
	outline: none;
	margin: 0 5px;
`;

interface Props {
	onClose: () => void;
	onChange: (filter: CityComplexFilter) => void;
	value: string;
}

const CityFilter = (props: Props) => {
	const { onChange, onClose, value } = props;

	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (ref?.current) {
			ref.current.focus();
		}
	}, [ref]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange({
			type: ComplexFilterType.CITY,
			value: event.target.value,
		});
	};

	return (
		<Input ref={ref} value={value} onChange={handleChange} onBlur={onClose} />
	);
};

export default CityFilter;
