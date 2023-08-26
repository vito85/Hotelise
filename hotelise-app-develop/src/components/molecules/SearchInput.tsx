import { ChangeEvent } from "react";
import styled from "styled-components";

import { Icon } from "components/atoms";

import { SearchComplexFilter, ComplexFilterType } from "interfaces/filters";
import { IconName } from "interfaces/icons";

import { MAIN_THEME } from "styles/colors";

const ClearButton = styled.button`
	position: absolute;
	right: 8px;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	cursor: pointer;
	background: transparent;
	outline: none;
	border: none;
`;

const IconWrap = styled.div`
	position: absolute;
	left: 8px;
	top: 50%;
	transform: translateY(-50%);
`;

const Container = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	width: 350px;
	border-radius: 8px;
	border: 1px solid #e5e2e9;
	overflow: hidden;
`;

const Input = styled.input`
	border: none;
	height: 32px;
	padding: 0 30px;
	width: 100%;
	outline: none;
`;

interface Props {
	filterData: SearchComplexFilter;
	changeFilter: (filter: SearchComplexFilter) => void;
	placeholder: string;
}

const SearchInput = (props: Props): JSX.Element => {
	const { filterData, changeFilter, placeholder } = props;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		changeFilter({
			type: ComplexFilterType.SEARCH,
			value,
			title: value,
		});
	};

	const handleClear = () => {
		changeFilter({
			type: ComplexFilterType.SEARCH,
			value: null,
		});
	};

	return (
		<Container>
			<IconWrap>
				<Icon name={IconName.SEARCH} color={MAIN_THEME.BLACK} size={13} />
			</IconWrap>
			<Input
				placeholder={placeholder}
				onChange={handleChange}
				value={filterData.value || ""}
			/>
			{filterData.value ? (
				<ClearButton onClick={handleClear}>
					<Icon name={IconName.CLOSE} color={MAIN_THEME.BLACK} size={18} />
				</ClearButton>
			) : null}
		</Container>
	);
};

export default SearchInput;
