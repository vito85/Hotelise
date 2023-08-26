import { BackgroundImageSize } from "interfaces/images";
import styled from "styled-components";

interface BaseProps {
	width?: number;
	height?: number;
	borderRadius?: number;
}

interface Props extends BaseProps {
	src: string;
	isBackground?: boolean;
	fullWidth?: boolean;
	fullHeight?: boolean;
	backgroundSize?: BackgroundImageSize;
}

interface ImageProps extends BaseProps {
	fullWidth?: boolean;
	fullHeight?: boolean;
}

interface BackgroundImageProps extends BaseProps {
	src: string;
	backgroundSize?: string;
}

const ImageElement = styled.img<ImageProps>`
	display: flex;
	max-width: 100%;
	width: ${(props) =>
		props.fullWidth ? "100%" : props.width ? `${props.width}px` : "100%"};
	height: ${(props) =>
		props.fullHeight ? "100%" : props.height ? `${props.height}px` : "auto"};
	border-radius: ${(props) =>
		props.borderRadius ? `${props.borderRadius}px` : 0};
`;

const BackgroundImage = styled.div<BackgroundImageProps>`
	display: flex;
	max-width: 100%;
	width: ${(props) => (props.width ? `${props.width}px` : "100%")};
	height: ${(props) => (props.height ? `${props.height}px` : "100%")};
	background-position: center;
	background-image: url(${(props) => props.src});
	background-size: ${(props) => props.backgroundSize || "contain"};
	background-repeat: no-repeat;
	border-radius: ${(props) =>
		props.borderRadius ? `${props.borderRadius}px` : 0};
`;

const Image = (props: Props): JSX.Element => {
	const {
		src,
		isBackground,
		width,
		height,
		fullHeight,
		fullWidth,
		backgroundSize,
		borderRadius,
	} = props;

	return isBackground ? (
		<BackgroundImage
			src={src}
			width={width}
			height={height}
			backgroundSize={backgroundSize}
			borderRadius={borderRadius}
		/>
	) : (
		<ImageElement
			src={src}
			width={width}
			height={height}
			fullHeight={fullHeight}
			fullWidth={fullWidth}
			borderRadius={borderRadius}
		/>
	);
};

export default Image;
