import { useRef } from "react";
import styled from "styled-components";

const Content = styled.div`
	max-height: 95vh;
	overflow-y: auto;
`;

const Container = styled.div`
	background: linear-gradient(
		180deg,
		rgba(255, 255, 255, 0.5) 0%,
		rgba(255, 255, 255, 0) 100%
	);
	filter: drop-shadow(1px 3px 14px rgba(0, 0, 0, 0.25));
	backdrop-filter: blur(20px);
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	height: 100vh;
	width: 100vw;
	z-index: 100;
	left: 0;
	top: 0;
`;

interface Props {
	children: JSX.Element | Array<JSX.Element>;
	onClick: () => void;
}

const ModalRoot = (props: Props): JSX.Element => {
	const { children, onClick } = props;

	const contentRef = useRef<HTMLDivElement>(null);

	const handleClick = (event: any) => {
		if (contentRef && contentRef.current) {
			if (!contentRef?.current.contains(event.target)) {
				onClick();
			}
		}
	};

	return (
		<Container onClick={handleClick}>
			<Content ref={contentRef}>{children}</Content>
		</Container>
	);
};

export default ModalRoot;
