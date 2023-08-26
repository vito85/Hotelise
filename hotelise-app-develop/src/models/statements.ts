export interface GetStatmentsReqParams {
	propertyIds: string;
	month?: string | number;
	year?: string | number;
	active?: boolean;
}

export interface GeneratePropertyStatmentReqParams {
	propertyId: string;
	month: string | number;
	year: string | number;
}

export interface ReportSendBody {
	receiver: string;
	sendToOwners: boolean;
}

export interface SendPropertyStatmentReqParams {
	propertyId: string;
	statementId: string;
	data: ReportSendBody;
}

export interface GetStatementDownloadLinkReqParams {
	propertyId: string;
	statementId: string;
}
