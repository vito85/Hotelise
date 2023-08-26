import styled from "styled-components";
import { FormEvent, useState } from "react";

import { Input } from "components/molecules";
import { Button, Icon, PasswordVisibilityToggler } from "components/atoms";

import { IconName } from "interfaces/icons";
import { ButtonSize } from "interfaces/buttons";

const Form = styled.form`
	width: 100%;
`;

const InputWrap = styled.div`
	margin-bottom: 30px;
`;

const InputSideContainer = styled.div`
	width: 65px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
`;

interface Props {
	login: string;
	password: string;
	code: string;
	submitTitle?: string;
	changeLogin: (value: string | number) => void;
	changePassword: (value: string | number) => void;
	changeCode: (value: string | number) => void;
	submit: (event: FormEvent) => void;
	isLoading: boolean;
	step: number;
}

const ForgotPasswordForm = (props: Props): JSX.Element => {
	const [isPasswordVisible, setPasswordVisibility] = useState(false);

	const {
		login,
		password,
		changeLogin,
		changePassword,
		submit,
		isLoading,
		submitTitle,
		changeCode,
		step,
		code,
	} = props;

	const togglePasswordVisibility = () => {
		setPasswordVisibility(!isPasswordVisible);
	};

	return (
		<Form onSubmit={submit} autoComplete="on">
			{step === 1 ? (
				<InputWrap>
					<Input
						value={login}
						onChange={changeLogin}
						placeholder="E-mail"
						leftContainer={
							<InputSideContainer>
								<Icon name={IconName.USER} color="#ffffff" size={16} />
							</InputSideContainer>
						}
					/>
				</InputWrap>
			) : null}
			{step === 2 ? (
				<>
					<InputWrap>
						<Input
							value={code}
							onChange={changeCode}
							placeholder="Code"
							type="text"
						/>
					</InputWrap>
					<InputWrap>
						<Input
							value={password}
							onChange={changePassword}
							placeholder="Password"
							type={isPasswordVisible ? "text" : "password"}
							leftContainer={
								<InputSideContainer>
									<Icon name={IconName.PASSWORD} color="#ffffff" size={16} />
								</InputSideContainer>
							}
							rightContainer={
								<InputSideContainer>
									<PasswordVisibilityToggler
										toggle={togglePasswordVisibility}
										isPasswordVisible={isPasswordVisible}
									/>
								</InputSideContainer>
							}
						/>
					</InputWrap>
				</>
			) : null}

			<Button
				type="submit"
				title={submitTitle || ""}
				bold
				isLoading={isLoading}
				size={ButtonSize.LG}
			/>
		</Form>
	);
};

export default ForgotPasswordForm;
