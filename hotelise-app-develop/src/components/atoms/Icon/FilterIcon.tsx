import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 1.4375;

const FilterIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 16;

	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 23 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="18.3333" cy="7.66634" r="1.83333" stroke={color} />
			<circle cx="9.66683" cy="13.0003" r="1.83333" stroke={color} />
			<circle cx="5.00008" cy="2.33333" r="1.83333" stroke={color} />
			<rect
				x="0.25"
				y="2.25"
				width="2.5"
				height="0.5"
				stroke={color}
				strokeWidth="0.5"
			/>
			<rect
				x="7.25"
				y="2.25"
				width="15.5"
				height="0.5"
				stroke={color}
				strokeWidth="0.5"
			/>
			<rect
				x="20.25"
				y="7.25"
				width="2.5"
				height="0.5"
				stroke={color}
				strokeWidth="0.5"
			/>
			<rect
				x="0.25"
				y="7.25"
				width="16.5"
				height="0.5"
				stroke={color}
				strokeWidth="0.5"
			/>
			<rect
				x="0.25"
				y="12.25"
				width="7.5"
				height="0.5"
				stroke={color}
				strokeWidth="0.5"
			/>
			<rect
				x="11.25"
				y="12.25"
				width="11.5"
				height="0.5"
				stroke={color}
				strokeWidth="0.5"
			/>
		</svg>
	);
};

export default FilterIcon;
