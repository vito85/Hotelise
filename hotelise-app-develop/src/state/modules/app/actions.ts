import { AppAction, AppActionTypes, SignOutAction } from "./types";

export function signOut(): SignOutAction {
	return {
		type: AppActionTypes.SIGN_OUT,
	};
}
