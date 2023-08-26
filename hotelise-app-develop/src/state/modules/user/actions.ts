import { User } from "interfaces/user";
import {
	GetUserAction,
	SetOwnerIdAction,
	SetUserAction,
	UserActionTypes,
} from "./types";

export function getUser(): GetUserAction {
	return {
		type: UserActionTypes.GET_USER,
	};
}

export function setUser(payload: User | null): SetUserAction {
	return {
		type: UserActionTypes.SET_USER,
		payload,
	};
}

export function setOwnerId(payload: string): SetOwnerIdAction {
	return {
		type: UserActionTypes.SET_OWNER_ID,
		payload,
	};
}
