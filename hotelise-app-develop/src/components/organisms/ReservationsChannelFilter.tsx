import styled from "styled-components";
import Select from "react-select";
import { useRef, useState } from "react";

import { selectComponentStyles } from "utils/selectStyles";
import { channelsList } from "utils/channels";

import { ChannelsSelectOption } from "interfaces/channels";
import { ComplexFilterItem, ComplexFilterType } from "interfaces/filters";

import { useOnClickOutside } from "hooks/useOnClickOutside";

import { FONT_FAMILY_BOLD } from "styles/typography";
import { MAIN_THEME } from "styles/colors";

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
	width: 400px;
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
	onChange: (filter: ComplexFilterItem) => void;
}

const ReservationsChannelFilter = (props: Props): JSX.Element => {
	const [selectedChannel, setSelectedChannel] =
		useState<ChannelsSelectOption | null>(null);

	const ref = useRef(null);

	const { onClose, onChange } = props;

	useOnClickOutside(ref, () => {
		onClose();
	});

	const handleReset = () => {
		setSelectedChannel(null);
		onChange({
			type: ComplexFilterType.CHANNEL,
			value: selectedChannel?.value || null,
			title: selectedChannel?.value,
		});

		onClose();
	};

	const handleApply = () => {
		onChange({
			type: ComplexFilterType.CHANNEL,
			value: selectedChannel?.value || null,
			title: selectedChannel?.value,
		});

		onClose();
	};

	const handleChangeChannel = (value: ChannelsSelectOption | null) => {
		if (value) {
			setSelectedChannel(value);
		}
	};

	const renderApplyButton = () => (
		<ActionButton
			right
			apply
			type="submit"
			onClick={handleApply}
			disabled={!selectedChannel}
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
				value={selectedChannel}
				onChange={handleChangeChannel}
				styles={{
					...selectComponentStyles,
				}}
				options={channelsList}
			/>
			<Actions>
				{renderResetButton()}
				{renderApplyButton()}
			</Actions>
		</Container>
	);
};

export default ReservationsChannelFilter;
