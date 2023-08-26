import { PropertyTab } from "interfaces/properties";
import styled from "styled-components";
import { MAIN_THEME } from "styles/colors";
import { FONT_FAMILY_BOLD } from "styles/typography";
import { propertyContentTabs } from "utils/properties";

interface Props {
	curentTab: PropertyTab;
	changeActiveTab: (tab: PropertyTab) => void;
}

const Container = styled.div`
	display: inline-flex;
	position: relative;
`;

const Divider = styled.div`
	background: #222222;
	box-shadow: inset -3px -3px 4px rgba(0, 0, 0, 0.25),
		inset 5px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	width: 100%;
	height: 1px;
	position: absolute;
	left: 0;
	bottom: 0;
`;

const Tab = styled.button<{ isActive: boolean }>`
	font-size: 16px;
	font-family: ${FONT_FAMILY_BOLD};
	color: ${MAIN_THEME.DARK_COLOR_SECOND};
	background: transparent;
	outline: none;
	border: none;
	width: 125px;
	text-align: center;
	padding-bottom: 10px;
	line-height: 24px;
	border-bottom: ${(props) =>
		props.isActive
			? `4px solid ${MAIN_THEME.DARK_COLOR_SECOND}`
			: `4px solid transparent`};
	transition: border-bottom 0.25s ease;
	cursor: pointer;
`;

const PropertiesDetailsTabs = (props: Props): JSX.Element => {
	const { curentTab, changeActiveTab } = props;

	const renderTabs = () =>
		propertyContentTabs.map((tab: PropertyTab) => {
			const isActive = tab.value === curentTab.value;

			return (
				<Tab
					key={tab.value}
					onClick={() => changeActiveTab(tab)}
					isActive={isActive}
				>
					{tab.title}
				</Tab>
			);
		});

	return (
		<Container>
			{renderTabs()}
			<Divider />
		</Container>
	);
};

export default PropertiesDetailsTabs;
