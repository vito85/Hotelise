import { AxiosResponse } from "axios";

import { PropertiesTemplate } from "interfaces/templates";

import $http from "./instance";

class TemplatesClient {
	public static async createPropertiesTemplate(
		data: PropertiesTemplate
	): Promise<AxiosResponse> {
		return $http.post(`/properties-templates/`, data);
	}

	public static async getPropertiesTemplates(): Promise<AxiosResponse> {
		return $http.get(`/properties-templates/`);
	}

	public static async getPropertiesTemplateById(
		id: string
	): Promise<AxiosResponse> {
		return $http.get(`/properties-templates/${id}`);
	}

	public static async updatePropertiesTemplate(
		data: PropertiesTemplate
	): Promise<AxiosResponse> {
		return $http.put(`/properties-templates/`, data);
	}

	public static async deletePropertiesTemplate(
		id: string
	): Promise<AxiosResponse> {
		return $http.delete(`/properties-templates/${id}`);
	}
}

export default TemplatesClient;
