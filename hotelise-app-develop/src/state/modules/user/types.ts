import { User } from "interfaces/user";

export interface UserState {
	userInfo: User | null;
	ownerId: string;
}

export enum UserActionTypes {
	GET_USER = "@@user/GET_USER",
	SET_USER = "@@user/SET_USER",
	SET_OWNER_ID = "@@user/SET_OWNER_ID",
}

export interface GetUserAction {
	type: UserActionTypes.GET_USER;
}

export interface SetUserAction {
	type: UserActionTypes.SET_USER;
	payload: User | null;
}

export interface SetOwnerIdAction {
	type: UserActionTypes.SET_OWNER_ID;
	payload: string;
}

export type UserAction = GetUserAction | SetUserAction | SetOwnerIdAction;
