import { AxiosResponse } from "axios";
import { store } from "Root";

import $http from "./instance";

class UserClient {
	public static async getUserInfo(userId: string): Promise<AxiosResponse> {
		// const userId: string = store.getState().user.userInfo.id;

		return $http.get(`/users/${userId}`);
	}

	public static async updateUserInfo(
		userId: string,
		email: string
	): Promise<AxiosResponse> {
		// const userId: string = store.getState().user.userInfo.id;

		return $http.put(`/users/${userId}/email/${email}`);
	}
}

export default UserClient;
