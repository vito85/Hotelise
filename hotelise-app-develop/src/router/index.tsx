import { Suspense } from "react";
import styled from "styled-components";

import AppFlow from "./AppFlow";

const Container = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
`;

export const Router = (): JSX.Element => (
	<Suspense fallback={<></>}>
		<Container>
			<AppFlow />
		</Container>
	</Suspense>
);
