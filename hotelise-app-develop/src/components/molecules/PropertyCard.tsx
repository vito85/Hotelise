import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { Image, Button } from "components/atoms";

import { Property } from "models/properties";
import { ButtonSize } from "interfaces/buttons";

import { BackgroundImageSize } from "interfaces/images";

import { MAIN_THEME } from "styles/colors";

interface Props {
	data: Property;
}

const Container = styled.div`
	background: #ffffff;
	border: 1px solid #e5e2e9;
	display: grid;
	grid-template-columns: 0.25fr 0.35fr 1fr 0.5fr;
	gap: 10px;
	align-items: center;
	justify-content: center;
	margin-bottom: 1px;
	text-align: left;
`;

const TableCell = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding: 10px 0;
`;

const Title = styled.p`
	text-transform: capitalize;
	color: ${MAIN_THEME.DARK_COLOR};
	font-size: 22px;
`;

const Address = styled.p`
	color: rgba(26, 26, 26, 0.7);
	font-size: 18px;
`;

const PropertyCard = (props: Props): JSX.Element => {
	const { data } = props;

	const { id, name, picture, address } = data;

	const navigate = useNavigate();
	const location = useLocation();

	const handleNavigateToDetails = (): void => {
		navigate(`${location.pathname}/${id}`);
	};

	const renderTitle = () => {
		const nameWithoutDash = name.replaceAll("-", " ");
		const nameWithoutUnderscore = nameWithoutDash.replaceAll("_", " ");

		return <Title>{nameWithoutUnderscore}</Title>;
	};

	return (
		<Container>
			<TableCell>
				<Image
					src={picture}
					isBackground
					fullWidth
					fullHeight
					borderRadius={4}
					backgroundSize={BackgroundImageSize.CONTAIN}
				/>
			</TableCell>
			<TableCell>{renderTitle()}</TableCell>
			<TableCell>
				<Address>{address.display}</Address>
			</TableCell>
			<TableCell>
				<Button
					dark
					title="Details"
					onClick={handleNavigateToDetails}
					size={ButtonSize.MD}
				/>
			</TableCell>
		</Container>
	);
};

export default PropertyCard;
