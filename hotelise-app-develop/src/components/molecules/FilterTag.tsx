import styled from "styled-components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import {
	ReservationsChannelFilter,
	ReservationsDateFilter,
	ReservationsPropertyFilter,
	ReservationsStatusFilter,
} from "components/organisms";

import { Icon } from "components/atoms";

import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";

import { IconName } from "interfaces/icons";

import { MAIN_THEME } from "styles/colors";
import CityFilter from "./CityFilter";

const Title = styled.p`
	font-size: 14px;
	text-transform: capitalize;
`;

const DeleteButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border: none;
	outline: none;
	background: transparent;
	margin-left: 5px;
	margin-right: -5px;
`;

const ClickableArea = styled.div`
	cursor: pointer;
	outline: none;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 12px;
	background: transparent;
	height: 100%;
	width: 100%;
`;

const Container = styled.div`
	height: 32px;
	background-color: #f8f7f9;
	border-radius: 4px;
	position: relative;
`;

interface Props {
	filter: ComplexFilterItem;
	onDelete: (type: ComplexFilterType) => void;
	onChange: (filter: ComplexFilterItem) => void;
}

const FilterTag = (props: Props): JSX.Element => {
	const [isDropdownVisible, setDropdownVisible] = useState(false);
	const [isInputActive, setInputActive] = useState(false);

	const { filter, onDelete, onChange } = props;

	useEffect(() => {
		if (filter.type === ComplexFilterType.CITY) {
			setInputActive(true);
		}
	}, [filter]);

	const getTitle = () => {
		switch (filter.type) {
			case ComplexFilterType.STATUS:
				return "Status:";
			case ComplexFilterType.CHANNEL:
				return "Channel:";
			case ComplexFilterType.PROPERTY_ID:
				return "Property:";
			case ComplexFilterType.DATE:
				return "Date:";
			case ComplexFilterType.CITY:
				return "City:";
			default:
				return "";
		}
	};

	const getFilterValue = () => {
		switch (filter.type) {
			case ComplexFilterType.STATUS:
				return filter.value;
			case ComplexFilterType.CHANNEL:
				return filter.value;
			case ComplexFilterType.PROPERTY_ID:
				return filter.value;
			case ComplexFilterType.CITY:
				return filter.value;
			case ComplexFilterType.DATE:
				if (filter.value) {
					return `${dayjs(filter.value.dateFrom).format("LL")}-${dayjs(
						filter.value.dateTo
					).format("LL")}`;
				}

				return "";
			default:
				return "";
		}
	};

	const getFilterText = () => {
		const title = getTitle();

		const value = getFilterValue();

		if (value && filter.type !== ComplexFilterType.CITY) {
			return `${title} ${filter.title || value}`;
		}

		return title;
	};

	const filterText = getFilterText();

	const toggle = () => {
		if (filter.type === ComplexFilterType.CITY) {
			if (!isInputActive) {
				setInputActive(true);
			}
		} else {
			setDropdownVisible(true);
		}
	};

	const handleClose = () => {
		if (filter.type !== ComplexFilterType.CITY) {
			setDropdownVisible(false);
		} else {
			setInputActive(false);
		}
	};

	const renderInput = () => {
		switch (filter.type) {
			case ComplexFilterType.CITY:
				return (
					<CityFilter
						onClose={handleClose}
						onChange={onChange}
						value={filter.value || ""}
					/>
				);

			default:
				return <></>;
		}
	};

	const renderDropdown = () => {
		switch (filter.type) {
			case ComplexFilterType.STATUS:
				return (
					<ReservationsStatusFilter onClose={handleClose} onChange={onChange} />
				);
			case ComplexFilterType.CHANNEL:
				return (
					<ReservationsChannelFilter
						onClose={handleClose}
						onChange={onChange}
					/>
				);
			case ComplexFilterType.PROPERTY_ID:
				return (
					<ReservationsPropertyFilter
						onClose={handleClose}
						onChange={onChange}
					/>
				);
			case ComplexFilterType.DATE:
				return (
					<ReservationsDateFilter onClose={handleClose} onChange={onChange} />
				);
			default:
				return <></>;
		}
	};

	const renderDeleteButton = () => (
		<DeleteButton onClick={() => onDelete(filter.type)}>
			<Icon name={IconName.CLOSE} size={15} color={MAIN_THEME.BLACK} />
		</DeleteButton>
	);

	return (
		<Container>
			<ClickableArea onClick={toggle}>
				<Title>{`${filterText}`}</Title>
				{isInputActive ? renderInput() : null}
				{renderDeleteButton()}
			</ClickableArea>
			{isDropdownVisible ? renderDropdown() : null}
		</Container>
	);
};

export default FilterTag;
