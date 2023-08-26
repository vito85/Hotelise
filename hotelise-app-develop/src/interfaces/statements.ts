import { PropertyReport } from "interfaces/reports";

export interface Statement {
	id: string;
	propertyId: string;
	statementNumber: number;
	year: string;
	month: string;
	active: boolean;
	pdfLink: string;
	reportData: PropertyReport;
	sent: boolean;
	paid: boolean;
	reviewed: boolean;
	updatedAt: number;
	createdAt: number;
	propertyName?: string;
}
