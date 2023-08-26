import { createSelector } from "reselect";
import { State } from "state/modules";

import { UserState } from "./types";

export const getUserState = (state: State): UserState => state.user;

export const getUserData = createSelector(
	getUserState,
	(state) => state.userInfo
);
