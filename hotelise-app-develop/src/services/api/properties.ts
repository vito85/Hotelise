import { AxiosResponse } from "axios";
import { build, omit } from "search-params";

import { GetPropertiesReqParams, Property } from "models/properties";

import { store } from "Root";
import $http from "./instance";

class PropertiesClient {
	public static async getProperties(
		params: GetPropertiesReqParams
	): Promise<AxiosResponse> {
		const userId: string = store.getState().user.ownerId;

		const { fields, offset, name, city, limit } = params;

		let query = build({
			offset,
			limit: limit || 9000,
			name,
			city,
			fields,
		});

		if (!name) {
			query = omit(query, ["name"]).querystring;
		}

		if (!city) {
			query = omit(query, ["city"]).querystring;
		}

		return $http.get(`users/${userId}/properties?${query}`);
	}

	public static async getPropertyById(id: string): Promise<AxiosResponse> {
		const userId: string = store.getState().user.ownerId;

		return $http.get(`users/${userId}/properties/${id}`);
	}
}

export default PropertiesClient;
