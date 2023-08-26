import produce from "immer";
import { UserAction, UserActionTypes, UserState } from "./types";

const initialState: UserState = {
	userInfo: null,
	ownerId: "",
};

const reservationsReducer = (
	state = initialState,
	action: UserAction
): UserState =>
	produce(state, (draft: UserState) => {
		switch (action.type) {
			case UserActionTypes.SET_USER:
				draft.userInfo = action.payload;

				return;
			case UserActionTypes.SET_OWNER_ID:
				draft.ownerId = action.payload;

				return;
			default:
				return state;
		}
	});

export default reservationsReducer;
