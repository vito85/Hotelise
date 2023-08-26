import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 1;

const CheckIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 32;

	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			width={width}
			height={height}
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 32.296 32.296"
			enableBackground="new 0 0 32.296 32.296;"
			xmlSpace="preserve"
		>
			<g>
				<path
					fill={color}
					d="M31.923,9.14L13.417,27.642c-0.496,0.494-1.299,0.494-1.793,0L0.37,16.316
		c-0.494-0.496-0.494-1.302,0-1.795l2.689-2.687c0.496-0.495,1.299-0.495,1.793,0l7.678,7.729L27.438,4.654
		c0.494-0.494,1.297-0.494,1.795,0l2.689,2.691C32.421,7.84,32.421,8.646,31.923,9.14z"
				/>
			</g>
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
			<g />
		</svg>
	);
};

export default CheckIcon;
