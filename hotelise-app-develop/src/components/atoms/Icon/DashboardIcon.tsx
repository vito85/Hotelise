import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 1;

const DashboardIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 15;

	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 48 48"
		>
			<path
				fill={color}
				d="M9 42Q7.75 42 6.875 41.125Q6 40.25 6 39V9Q6 7.75 6.875 6.875Q7.75 6 9 6H39Q40.25 6 41.125 6.875Q42 7.75 42 9V39Q42 40.25 41.125 41.125Q40.25 42 39 42ZM20.5 39V25.5H9V39Q9 39 9 39Q9 39 9 39ZM23.5 39H39Q39 39 39 39Q39 39 39 39V25.5H23.5ZM9 22.5H39V9Q39 9 39 9Q39 9 39 9H9Q9 9 9 9Q9 9 9 9Z"
			/>
		</svg>
	);
};

export default DashboardIcon;
