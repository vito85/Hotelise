import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 1;

const PlusIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 18;

	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6.04286 0V5.97136H0V11.9857H6.04286V18H12V11.9857H18V5.97136H12V0H6.04286Z"
				fill={color}
			/>
		</svg>
	);
};

export default PlusIcon;
