/* eslint-disable @typescript-eslint/no-explicit-any */

import { Auth } from "aws-amplify";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const windowFork = window;

const $http: AxiosInstance = Axios.create({
	baseURL: windowFork.config.REACT_APP_API_URL,
});

$http.interceptors.request.use(
	(config: AxiosRequestConfig) =>
		new Promise((resolve) => {
			Auth.currentSession()
				.then((session) => {
					const idTokenExpire = session.getIdToken().getExpiration();
					const refreshToken = session.getRefreshToken();
					const currentTimeSeconds = Math.round(+new Date() / 1000);
					if (idTokenExpire < currentTimeSeconds) {
						Auth.currentAuthenticatedUser().then((res) => {
							res.refreshSession(refreshToken, (err: any, data: any) => {
								if (err) {
									Auth.signOut();
								} else {
									(config.headers as any).Authorization = `Bearer ${data
										.getIdToken()
										.getJwtToken()}`;
									resolve(config);
								}
							});
						});
					} else {
						(config.headers as any).Authorization = `Bearer ${session
							.getIdToken()
							.getJwtToken()}`;
						resolve(config);
					}
				})
				.catch(() => {
					// No logged-in user: don't set auth header
					resolve(config);
				});
		})
);

export default $http;
