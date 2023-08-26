export interface AppState {
	isLoading: boolean;
}

export enum AppActionTypes {
	SIGN_OUT = "@@app/SIGN_OUT",
}

export interface SignOutAction {
	type: AppActionTypes.SIGN_OUT;
}

export type AppAction = SignOutAction;
