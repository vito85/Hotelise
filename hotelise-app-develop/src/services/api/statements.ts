import { AxiosResponse } from "axios";
import { build, omit } from "search-params";

import {
	GeneratePropertyStatmentReqParams,
	GetStatmentsReqParams,
	GetStatementDownloadLinkReqParams,
	SendPropertyStatmentReqParams,
} from "models/statements";

import { store } from "Root";
import $http from "./instance";

class StatementsClient {
	public static async getStatements(
		params: GetStatmentsReqParams
	): Promise<AxiosResponse> {
		const userId: string = store.getState().user.userInfo.id;
		// const userId: string = store.getState().user.ownerId;

		const { propertyIds, month, year, active } = params;

		const query = build({
			month,
			year,
			active,
			propertyIds,
		});

		if (!month) {
			omit(query, ["month"]);
		}
		if (!year) {
			omit(query, ["year"]);
		}

		// return $http.get(`/reports/statement?${query}`);
		// return $http.get(`/reports/statement?${query}`);
		return $http.get(`/users/${userId}/properties/statements?${query}`);
	}

	public static async generateStatement(
		params: GeneratePropertyStatmentReqParams
	): Promise<AxiosResponse> {
		const { propertyId, month, year } = params;

		const query = build({
			month,
			year,
		});

		return $http.post(
			`/reports/statement/generate/property/${propertyId}?${query}`
		);
	}

	public static async sendStatement(
		params: SendPropertyStatmentReqParams
	): Promise<AxiosResponse> {
		const { propertyId, data, statementId } = params;

		return $http.post(
			`/reports/statement/property/${propertyId}/statement/${statementId}/send`,
			data
		);
	}

	public static async getStatementDownloadLink(
		params: GetStatementDownloadLinkReqParams
	): Promise<AxiosResponse> {
		const { propertyId, statementId } = params;

		return $http.get(
			`/reports/statement/property/${propertyId}/statement/${statementId}/download`
		);
	}
}

export default StatementsClient;
