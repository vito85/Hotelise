import React from "react";
import ReactDOM from "react-dom/client";
import Amplify from "aws-amplify";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Root from "./Root";

import "./index.css";
import "assets/scss/main.scss";

declare global {
	interface Window {
		config: {
			REACT_APP_API_URL: string;
			REACT_APP_SHORT_API_URL: string;
			REACT_APP_CLOUDFRONT_URL: string;
			REACT_APP_SOLUTION_REGION: string;
			REACT_APP_SOLUTION_USERPOOLID: string;
			REACT_APP_SOLUTION_USERPOOLWEBCLIENTID: string;
			REACT_APP_SOLUTION_IDENTITYPOOLID: string;
			REACT_APP_SOLUTION_BUCKET: string;
			REACT_APP_DOWNLOAD_TRAILER_BUCKET: string;
			REACT_APP_SOLUTION_ENDPOINT: string;
			REACT_APP_SOLUTION_CONSOLE_LINK: string;
			REACT_APP_SFTP_SERVER_URL: string;
		};
	}
}

const windowFork = window;

Amplify.configure({
	Auth: {
		region: windowFork.config.REACT_APP_SOLUTION_REGION,
		userPoolId: windowFork.config.REACT_APP_SOLUTION_USERPOOLID,
		userPoolWebClientId:
			windowFork.config.REACT_APP_SOLUTION_USERPOOLWEBCLIENTID,
		identityPoolId: windowFork.config.REACT_APP_SOLUTION_IDENTITYPOOLID,
	},
	Storage: {
		bucket: windowFork.config.REACT_APP_SOLUTION_BUCKET,
		region: windowFork.config.REACT_APP_SOLUTION_REGION,
		identityPoolId: windowFork.config.REACT_APP_SOLUTION_IDENTITYPOOLID,
	},
	API: {
		endpoints: [
			{
				name: "MediaAnalysisApi",
				region: windowFork.config.REACT_APP_SOLUTION_REGION,
				endpoint: windowFork.config.REACT_APP_SOLUTION_ENDPOINT,
			},
		],
	},
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
