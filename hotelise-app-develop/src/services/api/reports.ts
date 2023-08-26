import { AxiosResponse } from "axios";
import { GeneratePropertiesReportReqParams } from "models/reports";
import { build } from "search-params";

import $http from "./instance";

class ReportsClient {
	public static async getReportData(params: {
		year: number;
		propertyIds: string;
	}): Promise<AxiosResponse<any>> {
		const { year, propertyIds } = params;

		const queryParams = {
			propertyIds,
			year,
		} as any;

		const query = build({
			...queryParams,
		});

		return $http.get(`/reports/reportData?${query}`);
	}

	public static async generateReport(
		params: GeneratePropertiesReportReqParams
	): Promise<AxiosResponse<any>> {
		const { fields, dateFrom, dateTo, propertyIds, dateFromType, dateToType } =
			params;

		const queryParams = {
			propertyIds,
		} as any;

		if (dateFrom) {
			queryParams[`${dateFromType}[gte]`] = dateFrom;
			queryParams["expense_date[gte]"] = dateFrom;
		}

		if (dateTo) {
			queryParams[`${dateToType}[lte]`] = dateTo;
			queryParams["expense_date[lte]"] = dateTo;
		}

		const query = build({
			...queryParams,
			fields,
		});

		return $http.post(`/reports/generate?${query}`);
	}

	public static async getFullYearReport(params: {
		year: number;
		propertyIds: string;
		fields?: string;
	}): Promise<AxiosResponse<any>> {
		const { fields, year, propertyIds } = params;

		const queryParams = {
			propertyIds,
			year,
			fields,
		} as any;

		const query = build({
			...queryParams,
		});

		return $http.get(`/reports/reportData?${query}`);
	}
}

export default ReportsClient;
