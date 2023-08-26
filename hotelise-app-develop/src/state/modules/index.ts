import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { all, fork } from "redux-saga/effects";

import { reservationsSaga } from "state/modules/reservations/sagas";
import reservationsReducer from "state/modules/reservations/reducer";
import { ReservationsState } from "state/modules/reservations";

import { propertiesSaga } from "state/modules/properties/sagas";
import propertiesReducer from "state/modules/properties/reducer";
import { PropertiesState } from "state/modules/properties";

import { expensesSaga } from "state/modules/expenses/sagas";
import { ExpensesState } from "state/modules/expenses";
import expesesReducer from "state/modules/expenses/reducer";

import { statementsSaga } from "state/modules/statements/sagas";
import { StatementsState } from "state/modules/statements";
import statementsReducer from "state/modules/statements/reducer";

import { userSaga } from "state/modules/user/sagas";
import { UserState } from "state/modules/user";
import userReducer from "state/modules/user/reducer";

import { dashboardSaga } from "state/modules/dashboard/sagas";
import { DashboardState } from "state/modules/dashboard";
import dashboardReducer from "state/modules/dashboard/reducer";

const combinedReducer = combineReducers({
	reservations: reservationsReducer,
	properties: propertiesReducer,
	expenses: expesesReducer,
	statements: statementsReducer,
	user: userReducer,
	dashboard: dashboardReducer,
});

// Clear app state when signout action fires
export const rootReducer: Reducer = (
	state: CombinedState<{
		reservations: ReservationsState;
		properties: PropertiesState;
		expenses: ExpensesState;
		statements: StatementsState;
		user: UserState;
		dashboard: DashboardState;
	}>,
	action: AnyAction
) => combinedReducer(state, action);
// if (action.type === UserActionTypes.SIGN_OUT) {
//   state = undefined;

// }

export function* rootSaga(): Generator {
	const sagas = [
		reservationsSaga,
		propertiesSaga,
		expensesSaga,
		statementsSaga,
		userSaga,
		dashboardSaga,
	].filter((saga) => saga !== undefined);

	yield all(sagas.map((saga) => fork(saga)));
}

export type State = ReturnType<typeof rootReducer>;
