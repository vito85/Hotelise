import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 1;

const SearchIcon = ({ size, color }: IconProps): JSX.Element => {
	let height = 15;

	if (size) {
		height = size;
	}
	const width = calculateSideByRatio(height, SIDES_RATIO);

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.8291 14.0045L11.1684 10.3438C12.0783 9.24958 12.6265 7.84447 12.6265 6.31348C12.6265 2.83221 9.7944 0 6.3133 0C2.83213 0 0 2.83221 0 6.31348C0 9.79451 2.83213 12.6265 6.3133 12.6265C7.84421 12.6265 9.24939 12.0784 10.3436 11.1684L14.0044 14.8292C14.1182 14.9431 14.2675 15 14.4168 15C14.566 15 14.7153 14.9431 14.8292 14.8292C15.0569 14.6014 15.0569 14.2322 14.8291 14.0045ZM1.16638 6.31348C1.16638 3.47536 3.47527 1.16638 6.3133 1.16638C9.15126 1.16638 11.4601 3.47536 11.4601 6.31348C11.4601 9.15137 9.15126 11.4601 6.3133 11.4601C3.47527 11.4601 1.16638 9.15137 1.16638 6.31348Z"
				fill={color}
			/>
		</svg>
	);
};

export default SearchIcon;
