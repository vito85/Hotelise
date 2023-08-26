import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 0.704;

const LogoIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 44;

	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 31 44"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.6461 0.207059C15.3339 -0.0690196 14.8482 -0.0690196 14.5013 0.207059L0.381626 12.1129C0.138781 12.32 0 12.6306 0 12.9757V42.7576C0 43.2408 0.381613 43.6204 0.867302 43.6204H17.9705C18.4562 43.6204 18.8378 43.2408 18.8378 42.7576V38.7545C18.8378 38.2714 18.4562 37.8918 17.9705 37.8918H8.11796C7.63227 37.8918 7.25065 37.5121 7.25065 37.029V15.2533C7.25065 14.9773 7.38942 14.7357 7.59758 14.5631L14.536 9.11059C14.8482 8.86903 15.2992 8.86903 15.6114 9.11059L22.5846 14.5976C22.7927 14.7702 22.9315 15.0118 22.9315 15.2878V42.7922C22.9315 43.2753 23.3131 43.6549 23.7988 43.6549H29.3495C29.8352 43.6549 30.2168 43.2753 30.2168 42.7922V13.0102C30.2168 12.6651 30.078 12.3545 29.8352 12.1475L15.6461 0.207059Z"
				fill={color}
			/>
		</svg>
	);
};

export default LogoIcon;
