import styled from "styled-components";

import { Image } from "components/atoms";

import { Property } from "models/properties";

import { FONT_FAMILY_BOLD } from "styles/typography";

const Container = styled.div`
	gap: 40px;
	display: grid;
	grid-template-columns: 500px 1fr;
`;

const LeftSide = styled.div`
	flex-shrink: 0;
`;

const RightSide = styled.div`
	width: 100%;
	overflow-x: auto;
`;

const InfoTitle = styled.p`
	font-family: ${FONT_FAMILY_BOLD};
	text-transform: capitalize;
	font-size: 36px;
	margin-bottom: 8px;
`;

const OwnersContainer = styled.div`
	display: grid;
	gap: 12px;
	padding: 0 20px 10px;
	grid-template-columns: repeat(auto-fill, 250px);
	grid-template-rows: 65px 65px;
	grid-auto-flow: column;
	overflow-x: scroll;
	padding-bottom: 25px;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	&::-webkit-scrollbar {
		display: none;
	}
`;

const ImageContainer = styled.div`
	margin-bottom: 20px;
`;

const Address = styled.p`
	font-size: 18px;
	color: rgba(26, 26, 26, 0.7);
`;

interface Props {
	data: Property;
}

const PropertyInfo = (props: Props): JSX.Element => {
	const { data } = props;

	const { address, name, picture, owners, id } = data;

	const nameWithoutDash = name.replaceAll("-", " ");
	const nameWithoutUnderscore = nameWithoutDash.replaceAll("_", " ");

	return (
		<Container>
			<LeftSide>
				<ImageContainer>
					<Image src={picture} height={270} width={500} borderRadius={15} />
				</ImageContainer>
				<InfoTitle>{nameWithoutUnderscore}</InfoTitle>
				<Address>{address.display}</Address>
			</LeftSide>
		</Container>
	);
};

export default PropertyInfo;
