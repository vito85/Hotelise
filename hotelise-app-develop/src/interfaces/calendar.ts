export interface CalendarRange {
	dateFrom: string;
	dateTo: string;
}

export enum EndDatesObjectColor {
	GREEN = "GREEN",
	YELLOW = "YELLOW",
}

export interface CalendarDatesObject {
	date: string;
	propertyIds?: string[];
	yellowCount: number;
	greenCount: number;
}
