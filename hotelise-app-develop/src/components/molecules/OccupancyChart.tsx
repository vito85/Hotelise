import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import styled from "styled-components";

import { LoaderWithOverlay } from "components/atoms";

import { getDashboardYearReportData } from "state/modules/dashboard";

import { FONT_FAMILY_MEDIUM } from "styles/typography";

const Container = styled.div`
	width: 280px;
	background: #fff;
	border-radius: 4px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Title = styled.p`
	font-size: 20px;
	font-family: ${FONT_FAMILY_MEDIUM};
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	height: 100%;
`;

const Header = styled.div`
	padding: 15px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e5e2e9;
`;

interface Props {
	isLoading: boolean;
}

const OccupancyRate = (props: Props) => {
	const { isLoading } = props;

	const report = useSelector(getDashboardYearReportData);

	return (
		<Container>
			<Header>
				<Title>Occupancy Rate YTD</Title>
			</Header>
			<Content>
				<CircularProgressbar
					value={Math.trunc(report?.occupancyRate || 0)}
					text={`${Math.trunc(report?.occupancyRate || 0)}%`}
					styles={{
						text: {
							fill: "#303030",
						},
					}}
				/>
			</Content>
			{isLoading ? <LoaderWithOverlay /> : null}
		</Container>
	);
};

export default OccupancyRate;
