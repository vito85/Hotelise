import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 3;

const NabarTogglerIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 16;

	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 16 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 4L4 24L12 44"
				stroke={color}
				strokeOpacity="0.7"
				strokeWidth="7"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default NabarTogglerIcon;
