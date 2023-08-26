import { Navigate, Route, Routes } from "react-router-dom";

import { AuthFormContainer, AuthFlowContainer } from "components/atoms";
import { ForgotPassword, SignIn } from "components/organisms";

const AuthFlow = (props: any): JSX.Element => {
	const { authState } = props;

	const renderRoutes = () => {
		if (authState === "signIn") {
			return (
				<AuthFlowContainer>
					<AuthFormContainer>
						<Routes>
							<Route index element={<SignIn />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</AuthFormContainer>
				</AuthFlowContainer>
			);
		}

		return <></>;
	};

	return renderRoutes();
};

export default AuthFlow;
