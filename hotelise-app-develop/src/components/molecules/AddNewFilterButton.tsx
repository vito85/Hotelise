import styled from "styled-components";
import { useRef, useState } from "react";

import { ComplexFilterType } from "interfaces/filters";

import { useOnClickOutside } from "hooks/useOnClickOutside";

const Button = styled.div`
	padding: 0 12px;
	display: flex;
	transition: 0.25s ease all;
	cursor: pointer;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;

	&:hover {
		background-color: rgb(248, 247, 249);
	}
`;

const Container = styled.div`
	position: relative;
`;

const DropDownOption = styled.button`
	font-size: 14px;
	padding: 0 16px;
	background: transparent;
	border: none;
	outline: none;
	height: 32px;
	line-height: 32px;
	cursor: pointer;
	width: 100%;
	text-align: left;

	&:hover {
		background: rgba(0, 0, 0, 0.04);
	}
`;

const DropDownContainer = styled.div`
	width: 280px;
	position: absolute;
	top: 35px;
	left: 0;
	box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
		0 1px 10px 0 rgb(0 0 0 / 12%);
	background: #ffffff;
	padding: 8px 0;
	border-radius: 4px;
`;

interface Props {
	onCreate: (type: ComplexFilterType) => void;
	options: ComplexFilterType[];
}

const AddNewFilterButton = (props: Props): JSX.Element => {
	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const { onCreate, options } = props;

	const dropDownRef = useRef(null);

	useOnClickOutside(dropDownRef, () => {
		setDropdownVisible(false);
	});

	const getOptionTitle = (option: ComplexFilterType) => {
		switch (option) {
			case ComplexFilterType.CHANNEL:
				return "Channel";
			case ComplexFilterType.DATE:
				return "Date";
			case ComplexFilterType.PROPERTY_ID:
				return "Property";
			case ComplexFilterType.STATUS:
				return "Status";
			case ComplexFilterType.CITY:
				return "City";
			default:
				return "";
		}
	};

	const renderDropdown = () => (
		<DropDownContainer ref={dropDownRef}>
			{options.map((option) => (
				<DropDownOption
					key={option}
					onClick={() => {
						onCreate(option);
						setDropdownVisible(false);
					}}
				>
					{getOptionTitle(option)}
				</DropDownOption>
			))}
		</DropDownContainer>
	);

	return (
		<Container>
			<Button onClick={() => setDropdownVisible(true)}>+ Filter</Button>
			{isDropdownVisible ? renderDropdown() : null}
		</Container>
	);
};

export default AddNewFilterButton;
