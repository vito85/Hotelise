import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { useMemo, useState } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDispatch, useSelector } from "react-redux";

import { LoaderWithOverlay } from "components/atoms";

import {
	getDashboardSelectedYear,
	getDashboardYearReport,
	getDashboardYearReportData,
	setDashboardReportYear,
} from "state/modules/dashboard";
import { PropertyYearReport } from "../../interfaces/reports";

const Title = styled.p`
	font-family: "Open Sans Medium", sans-serif;
	font-size: 24px;
	font-weight: bold;
	margin: 0 10px;
`;

const Nav = styled.div`
	display: flex;
	align-items: center;
`;

const NavButton = styled.button`
	background: transparent;
	outline: none;
	cursor: pointer;
	border: none;
	font-weight: bold;
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NavTitle = styled.p`
	margin: 0 10px;
`;

const Header = styled.div`
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const ChartContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	width: 100%;
	background: #fff;
	padding: 10px;
	border-radius: 6px;
	position: relative;
	max-height: 600px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

// Add a styled component for the dataset buttons
interface DatasetButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive: boolean;
	color: string;
}

const DatasetButton = styled.button<DatasetButtonProps>`
	background-color: ${({ isActive, color }) => (isActive ? color : "#ccc")};
	color: #fff;
	border: none;
	padding: 5px 10px;
	margin-right: 5px;
	border-radius: 4px;
	cursor: pointer;
	outline: none;
`;

const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
`;

const YearNavButton = styled.button`
	background-color: #4bc0c0;
	color: #fff;
	border: none;
	padding: 5px 10px;
	margin-right: 5px;
	border-radius: 4px;
	cursor: pointer;
	outline: none;
	&:hover {
		background-color: #999;
	}
`;

const YearLabel = styled.span`
	font-family: "DS-Digital", sans-serif;
	font-size: 24px;
	font-weight: bold;
	margin: 0 10px;
`;

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	ChartDataLabels
);

const labels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

interface Props {
	isLoading: boolean;
}

const DashboardIncomeChart = (props: Props) => {
	const { isLoading } = props;

	const dispatch = useDispatch();

	const handleChangeYear = (selectedYear: number) => {
		dispatch(setDashboardReportYear(selectedYear));
		dispatch(getDashboardYearReport());
	};

	const year = useSelector(getDashboardSelectedYear);
	const report: PropertyYearReport | null = useSelector(
		getDashboardYearReportData
	);

	const datasetsInfo = [
		{
			id: "income",
			label: "Income",
			color: "#4bc0c0",
			unit: "$",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map(
					(item) => item.calculations.totalInCurrency.totalIncomeInCurrency
				),
		},

		{
			id: "payouts",
			label: "Payouts",
			color: "#3498db",
			unit: "$",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map(
					(item) =>
						item.calculations.totalInCurrency.totalIncomeInCurrency -
						item.calculations.totalInCurrency.totalExpensesInCurrency
				),
		},

		// {
		// 	id: "comission",
		// 	label: "Comission",
		// 	color: "#8a2be2",
		// 	unit: "$",
		// 	getData: (data: PropertyYearReport | null) =>
		// 		(data?.yearData || []).map(
		// 			(item) => item.calculations.totalInCurrency.totalHoteliseFeeInCurrency
		// 		),
		// },

		{
			id: "expenses",
			label: "Expenses",
			color: "#ff6384",
			unit: "$",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map(
					(item) => item.calculations.totalInCurrency.totalExpensesInCurrency
				),
		},
		{
			id: "cleaning",
			label: "Cleaning",
			color: "#26c6da",
			unit: "$",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map(
					(item) => item.calculations.totalInCurrency.totalCleaningInCurrency
				),
		},
		{
			id: "adr",
			label: "ADR",
			color: "#ff9f40",
			unit: "$",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map(
					(item) => item.calculations.totalInCurrency.adr
				),
		},
		{
			id: "revpar",
			label: "RevPAR",
			color: "#ffcd56",
			unit: "$",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map(
					(item) => item.calculations.totalInCurrency.revPar
				),
		},
		{
			id: "occupancy",
			label: "Occupancy",
			color: "#008080",
			unit: "%",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map((item) => item.calculations.occupancyRate),
		},
		{
			id: "alos",
			label: "ALOS",
			color: "#36a2eb",
			unit: "days",
			getData: (data: PropertyYearReport | null) =>
				(data?.yearData || []).map((item) => item.calculations.alos),
		},
	];

	const [selectedDataset, setSelectedDataset] = useState(datasetsInfo[0].id);

	// Define the datasets and their corresponding colors

	const data = useMemo(() => {
		const selectedData = datasetsInfo.find(
			(dataSetInfo) => dataSetInfo.id === selectedDataset
		);
		return {
			labels,
			datasets: [
				{
					data: selectedData?.getData(report),
					backgroundColor: selectedData?.color,
				},
			],
		};
	}, [selectedDataset, report]);

	const handleDatasetButtonClick = (datasetId: string) => {
		setSelectedDataset(datasetId);
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			ChartDataLabels,
			datalabels: {
				formatter(value: number) {
					const selectedData = datasetsInfo.find(
						(dataSetInfo) => dataSetInfo.id === selectedDataset
					);
					const unit = selectedData ? selectedData.unit : "";
					return value ? `${Math.round(value)}${unit}` : null;
				},
				color: "#303030",
				// clamp: true,
				// clip: true,
			},
		},
	};

	return (
		<Container>
			<Header>
				<Title>
					{" "}
					{
						datasetsInfo.find((dataset) => dataset.id === selectedDataset)
							?.label
					}{" "}
					for {year}
				</Title>
				<ButtonsContainer>
					<Nav>
						<YearNavButton
							onClick={() => handleChangeYear(year - 1)}
							disabled={isLoading}
						>
							{"\u{2190}"} {/* Left arrow symbol */}
						</YearNavButton>
						<YearLabel>{year}</YearLabel>
						<YearNavButton
							disabled={isLoading}
							onClick={() => handleChangeYear(year + 1)}
						>
							{"\u{2192}"} {/* Right arrow symbol */}
						</YearNavButton>

						{datasetsInfo.map((dataSetInfo) => (
							<DatasetButton
								key={dataSetInfo.id}
								onClick={() => handleDatasetButtonClick(dataSetInfo.id)}
								isActive={selectedDataset === dataSetInfo.id}
								color={dataSetInfo.color}
							>
								{dataSetInfo.label}
							</DatasetButton>
						))}
					</Nav>
				</ButtonsContainer>
			</Header>

			<ChartContainer>
				<Bar options={options} data={data} />
			</ChartContainer>
			{isLoading ? <LoaderWithOverlay /> : null}
		</Container>
	);
};

export default DashboardIncomeChart;
