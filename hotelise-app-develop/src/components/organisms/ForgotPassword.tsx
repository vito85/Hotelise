import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import { Image } from "components/atoms";
import { AuthForm, ForgotPasswordForm } from "components/molecules";

import { FONT_FAMILY_REGULAR } from "styles/typography";

import authFormBg from "assets/images/authFormBg.png";
import logo from "assets/images/logo.svg";
import { BackgroundImageSize } from "interfaces/images";

const SignUpContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 25px 0 0;
	width: 100%;
`;

const NavLink = styled(Link)`
	color: #ffffff;
	text-decoration: none;
	font-size: 16px;
	font-family: ${FONT_FAMILY_REGULAR};
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 0.55fr 0.45fr;
	width: 100%;
	height: 100%;
	align-items: center;
`;

const LogoWrap = styled.div`
	margin-bottom: 65px;
	display: flex;
	justify-content: center;
	height: 70px;
`;

const Form = styled.div`
	width: 364px;
`;

const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

const ForgotPassword = (): JSX.Element => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(1);

	const handleChangeLogin = (value: string | number) => {
		setLogin(`${value}`);
	};

	const handleChangeCode = (value: string | number) => {
		setCode(`${value}`);
	};

	const handleChangePassword = (value: string | number) => {
		setPassword(`${value}`);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);

			if (step === 1) {
				await Auth.forgotPassword(
					login // the Cognito User Object
				);

				setStep(2);
			} else {
				await Auth.forgotPasswordSubmit(login, code, password);

				await Auth.signIn(login, password);
			}

			setIsLoading(false);
		} catch (error) {
			console.log({ error });
			setIsLoading(false);
		}
	};

	return (
		<>
			<Container>
				<Image
					src={authFormBg}
					isBackground
					backgroundSize={BackgroundImageSize.COVER}
				/>
				<FormContainer>
					<Form>
						<LogoWrap>
							<Image src={logo} width={312} />
						</LogoWrap>
						<ForgotPasswordForm
							login={login}
							password={password}
							changeLogin={handleChangeLogin}
							changePassword={handleChangePassword}
							changeCode={handleChangeCode}
							submit={handleSubmit}
							submitTitle={step === 1 ? "Send Code" : "Reset Password"}
							isLoading={isLoading}
							code={code}
							step={step}
						/>
						<SignUpContainer>
							<NavLink to="sign-up">Back to Sing In</NavLink>
						</SignUpContainer>
					</Form>
				</FormContainer>
			</Container>
		</>
	);
};

export default ForgotPassword;
