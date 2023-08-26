import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 1;

const CloseIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 21;
	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 21 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.06188 6.42054L6.4217 5.06072L15.9404 14.5795L14.5806 15.9393L5.06188 6.42054Z"
				fill={color}
			/>
			<path
				d="M6.4217 15.9393L5.06188 14.5795L14.5806 5.06072L15.9404 6.42054L6.4217 15.9393Z"
				fill={color}
			/>
		</svg>
	);
};

export default CloseIcon;
