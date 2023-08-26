import { DateFilterType } from "interfaces/filters";
import { Report, PropertyReport } from "interfaces/reports";

export interface GeneratePropertiesReportReqParams {
	dateFrom: string | null;
	dateTo: string | null;
	propertyIds: string;
	dateFromType: DateFilterType;
	dateToType: DateFilterType;
	fields?: string;
}

export interface GenerateReportResponse {
	content: PropertyReport;
	_metadata: any;
}

export interface ReportSendBody extends Report {
	receiver: string;
}