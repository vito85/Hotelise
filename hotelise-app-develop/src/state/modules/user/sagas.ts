import { Auth } from "aws-amplify";
import { call, put, takeLatest } from "redux-saga/effects";
import UserClient from "services/api/users";

import * as userActions from "state/modules/user/actions";

import { AxiosResponse } from "axios";
import { UserActionTypes } from "./types";

export function* handleGetUser(): Generator {
	try {
		const currentUserInfo: any = yield call([Auth, "currentUserInfo"]);

		let userRes = (yield call(
			UserClient.getUserInfo,
			currentUserInfo.id
		)) as AxiosResponse;

		if (!userRes.data.content) {
			// console.log("123");
			const upateRes = (yield call(
				UserClient.updateUserInfo,
				currentUserInfo.id,
				currentUserInfo.attributes.email
			)) as AxiosResponse;

			userRes = (yield call(
				UserClient.getUserInfo,
				currentUserInfo.id
			)) as AxiosResponse;
		}

		yield put(userActions.setOwnerId(currentUserInfo.id));
		yield put(userActions.setUser(userRes.data.content));
	} catch (error) {
		console.log({ error });
	}
}

export function* userSaga(): Generator {
	yield takeLatest(UserActionTypes.GET_USER, handleGetUser);
}
