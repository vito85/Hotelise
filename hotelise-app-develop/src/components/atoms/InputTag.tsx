import styled from "styled-components";

import { PropertyFilter } from "state/modules/properties";
import { MAIN_THEME } from "styles/colors";
import { IconName } from "interfaces/icons";
import Icon from "./Icon";

interface Props {
	data: PropertyFilter;
	onDelete: (item: PropertyFilter) => void;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	border: 1px solid ${MAIN_THEME.GREY_DARK};
	box-sizing: border-box;
	border-radius: 50px;
	padding: 8px 10px;
	min-width: 100px;
	flex-shrink: 0;
	margin-right: 5px;
`;

const Text = styled.p`
	font-family: "Open Sans", sans-serif;
	font-size: 14px;
`;

const DeleteButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: transparent;
	cursor: pointer;
	outline: none;
	margin-left: auto;
	height: 100%;
	width: 20px;
`;

const InputTag = (props: Props): JSX.Element => {
	const { data, onDelete } = props;

	const handleDelete = () => {
		onDelete(data);
	};

	return (
		<Container onClick={handleDelete}>
			<Text>{`${data.filter}: ${data.value}`}</Text>
			<DeleteButton>
				<Icon name={IconName.CLOSE} size={14} color={MAIN_THEME.GREY_DARK} />
			</DeleteButton>
		</Container>
	);
};

export default InputTag;
