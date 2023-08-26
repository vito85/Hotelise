import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

import { Image } from "components/atoms";
import { AuthForm } from "components/molecules";

import authFormBg from "assets/images/authFormBg.png";
import logo from "assets/images/logo.svg";
import { BackgroundImageSize } from "interfaces/images";
import { FONT_FAMILY_REGULAR } from "styles/typography";

const NavLinkContainer = styled.div`
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

const SignIn = (): JSX.Element => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeLogin = (value: string | number) => {
		setLogin(`${value}`);
	};

	const handleChangePassword = (value: string | number) => {
		setPassword(`${value}`);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);

			const user = await Auth.signIn(login, password);

			if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
				Auth.completeNewPassword(
					user, // the Cognito User Object
					password // the new password
					// OPTIONAL, the required attributes
				).catch((e) => {
					console.log(e);
				});
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
						<AuthForm
							login={login}
							password={password}
							changeLogin={handleChangeLogin}
							changePassword={handleChangePassword}
							submit={handleSubmit}
							submitTitle="Sign In"
							isLoading={isLoading}
						/>
						<NavLinkContainer>
							<NavLink to="forgot-password">Forgot password?</NavLink>
						</NavLinkContainer>
					</Form>
				</FormContainer>
			</Container>
		</>
	);
};

export default SignIn;
