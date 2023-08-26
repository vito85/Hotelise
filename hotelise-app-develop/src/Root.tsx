import { withAuthenticator } from "aws-amplify-react";
import { composeWithDevTools } from "redux-devtools-extension";
import Redux, { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";

import AuthFlow from "router/AuthFlow";
import { Router } from "router";

import sagaMiddleware from "state/middlewares/saga";
import { rootSaga, rootReducer } from "state/modules";

dayjs.extend(localizedFormat);
dayjs.extend(duration);

const middlewares: Array<Redux.Middleware> = [sagaMiddleware];

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

const Root = () => {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
};

export default withAuthenticator(Root, false, [<AuthFlow />]);
