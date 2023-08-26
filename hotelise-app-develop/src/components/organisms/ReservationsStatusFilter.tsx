import styled from "styled-components";
import Select from "react-select";
import { useRef, useState } from "react";

import {
	ComplexFilterType,
	ReservationsStatusComplexFilter,
} from "interfaces/filters";

import { reservationStatusesList } from "utils/reservations";
import { selectComponentStyles } from "utils/selectStyles";

import { useOnClickOutside } from "hooks/useOnClickOutside";

import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_BOLD } from "styles/typography";
import { ReservationStatusSelectOption } from "interfaces/reservations";

interface ActionButtonProps {
	left?: boolean;
	right?: boolean;
	apply?: boolean;
	cancel?: boolean;
}

const Container = styled.div`
	position: absolute;
	left: 0;
	top: 45px;
	z-index: 10;
	background: rgba(255, 255, 255, 0.7);
	box-shadow: 1px 3px 14px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(20px);
	border-radius: 15px;
	padding: 30px 40px;
	width: 360px;
`;

const Actions = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1px;
	margin-top: 25px;
`;

const ActionButton = styled.button<ActionButtonProps>`
	display: flex;
	height: 54px;
	justify-content: center;
	align-items: center;
	border-top-left-radius: ${(props) => (props.left ? "109px" : 0)};
	border-bottom-left-radius: ${(props) => (props.left ? "109px" : 0)};
	border-top-right-radius: ${(props) => (props.right ? "109px" : 0)};
	border-bottom-right-radius: ${(props) => (props.right ? "109px" : 0)};
	border: none;
	background-color: ${(props) =>
		props.apply ? MAIN_THEME.GREY_DARK : MAIN_THEME.GREY_DARK_SECOND};
	color: #ffffff;
	font-family: ${FONT_FAMILY_BOLD};
	font-size: 18px;
	cursor: pointer;
`;

interface Props {
	onClose: () => void;
	onChange: (filter: ReservationsStatusComplexFilter) => void;
}

const ReservationsStatusFilter = (props: Props): JSX.Element => {
	const [selectedReservationStatus, setSelectedReservationStatus] =
		useState<ReservationStatusSelectOption | null>(null);

	const { onClose, onChange } = props;

	const ref = useRef(null);

	useOnClickOutside(ref, () => {
		onClose();
	});

	const handleChangeStatus = (value: ReservationStatusSelectOption | null) => {
		if (value) {
			setSelectedReservationStatus(value);
		}
	};

	const handleReset = () => {
		setSelectedReservationStatus(null);
		onChange({
			type: ComplexFilterType.STATUS,
			value: null,
		});

		onClose();
	};

	const handleApply = () => {
		onChange({
			type: ComplexFilterType.STATUS,
			value: selectedReservationStatus?.value || null,
		});

		onClose();
	};

	const renderApplyButton = () => (
		<ActionButton
			right
			apply
			type="submit"
			onClick={handleApply}
			disabled={!selectedReservationStatus}
		>
			Apply
		</ActionButton>
	);

	const renderResetButton = () => (
		<ActionButton left cancel onClick={handleReset}>
			Reset
		</ActionButton>
	);

	return (
		<Container ref={ref}>
			<Select
				value={selectedReservationStatus}
				onChange={handleChangeStatus}
				styles={{
					...selectComponentStyles,
				}}
				options={reservationStatusesList}
			/>
			<Actions>
				{renderResetButton()}
				{renderApplyButton()}
			</Actions>
		</Container>
	);
};

export default ReservationsStatusFilter;
