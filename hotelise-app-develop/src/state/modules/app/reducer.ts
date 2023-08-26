import produce from "immer";
import { AppAction, AppActionTypes, AppState } from "./types";

const initialState: AppState = {
	isLoading: false,
};

const reservationsReducer = (
	state = initialState,
	action: AppAction
): AppState =>
	produce(state, (draft: AppState) => {
		switch (action.type) {
			case AppActionTypes.SIGN_OUT:
				// draft.expensesList = action.payload.expensesList;

				return;
			default:
				return state;
		}
	});

export default reservationsReducer;
