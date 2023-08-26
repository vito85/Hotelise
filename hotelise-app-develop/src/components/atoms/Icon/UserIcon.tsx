import { IconProps } from "interfaces/icons";
import calculateSideByRatio from "utils/calculateSideByRatio";

const SIDES_RATIO = 1;

const UserIcon = ({ size, color }: IconProps): JSX.Element => {
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
			<g clipPath="url(#clip0)">
				<path
					d="M8.99998 10.0032C11.0013 10.0032 12.6238 8.03254 12.6238 5.60161C12.6238 3.17064 12.0911 1.2 8.99998 1.2C5.90887 1.2 5.37607 3.17064 5.37607 5.60161C5.37607 8.03254 6.99859 10.0032 8.99998 10.0032Z"
					fill={color}
				/>
				<path
					d="M2.15532 16.7239C2.1547 16.5756 2.15408 16.6821 2.15532 16.7239V16.7239Z"
					fill={color}
				/>
				<path
					d="M15.8444 16.8396C15.8463 16.7991 15.8451 16.5581 15.8444 16.8396V16.8396Z"
					fill={color}
				/>
				<path
					d="M15.8367 16.5461C15.7695 12.3114 15.2165 11.1047 10.9843 10.3409C10.9843 10.3409 10.3885 11.1 8.99995 11.1C7.61138 11.1 7.01553 10.3409 7.01553 10.3409C2.8295 11.0964 2.2428 12.2852 2.16566 16.4086C2.15934 16.7453 2.1564 16.763 2.15527 16.7239C2.15553 16.7971 2.15584 16.9326 2.15584 17.1688C2.15584 17.1688 3.16343 19.2 8.99995 19.2C14.8364 19.2 15.8441 17.1688 15.8441 17.1688C15.8441 17.017 15.8442 16.9115 15.8443 16.8397C15.8432 16.8639 15.8409 16.817 15.8367 16.5461Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0">
					<rect width="18" height="18" fill={color} />
				</clipPath>
			</defs>
		</svg>
	);
};

export default UserIcon;
