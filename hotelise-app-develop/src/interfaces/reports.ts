import { Property } from "models/properties";
// import { ReportTableItemWithTransfer } from "interfaces/reports";
import { CHANNEL_NAMES } from "./channels";
import { Contract } from "./contracts";
import { CurrencyValue } from "./currency";
import { Expense } from "./expenses";

export interface ReportTableItemDates {
	start_date: string;
	end_date: string;
}

export interface ReportTableItemCalculations {
	accommodation: number;
	host_service_fee: number;
	cleaning: number;
	payout_price: number;
	net_accomdation: number;
	hotelise_help: number;
	owner_income: number;
}

export interface ReportTableItemGuest {
	first_name: string;
	last_name: string;
	picture_url: string;
}

export interface ReportTableItem {
	start_date: string;
	end_date: string;
	guest: ReportTableItemGuest;
	code: string;
	currency: string;
	accommodation: number;
	host_service_fee: number;
	cleaning: number;
	payout_price: number;
	net_accomdation: number;
	hotelise_help: number;
	owner_income: number;
	channel: CHANNEL_NAMES;
	status: string;
	propertyId: string;
	nights: number;
}

export interface Report {
	items: ReportTableItem[];
}

export interface CurrencyAccountTransfer {
	_currency: string;
	_amount: number;
	_accountHolder: number;
	_toTransfer: number;
	_code: string;
}

export interface FinalTransfers {
	remainingExpenses: Map<string, number>;
	finalCurrencyAndAccounts: CurrencyAccountTransfer[];
}

export interface ReportTableItemWithTransfer {
	property?: Property;
	_item: ReportTableItem;
	_transferDetails: CurrencyAccountTransfer;
}

export interface PropertyReportTotalPerCurrency {
	[CurrencyValue.USD]: number;
	[CurrencyValue.AMD]: number;
	[CurrencyValue.GBP]: number;
}

export interface PropertyReportFinalTransfers {
	remainingExpenses: PropertyReportTotalPerCurrency;
	finalCurrencyAndAccounts: Array<CurrencyAccountTransfer>;
}

export interface TotalInCurrency {
	currency: CurrencyValue;
	totalIncomeInCurrency: number;
	totalExpensesInCurrency: number;
	netOwnerIncomeInCurrency: number;
	totalCleaningInCurrency: number;
	totalHoteliseFeeInCurrency: number;
	adr: number;
	revPar: number;
}

export interface ReportReservationPeriond {
	numberOfReservations: number;
	availableNights: number;
}

export interface PropertyReportCalculations {
	totalIncomePerCurrency: PropertyReportTotalPerCurrency;
	totalExpensesPerCurrency: PropertyReportTotalPerCurrency;
	totalCleaningPerCurrency: PropertyReportTotalPerCurrency;
	totalHoteliseFeePerCurrency: PropertyReportTotalPerCurrency;
	allAccountTransfers: Array<ReportTableItemWithTransfer>;
	mergedAccountTransfers: Array<CurrencyAccountTransfer>;
	deltaAccountTransfers: Array<CurrencyAccountTransfer>;
	finalTransfers: PropertyReportFinalTransfers;
	totalInCurrency: TotalInCurrency;
	occupancyRate: number;
	reservationPeriod: ReportReservationPeriond;
	alos: number;
}

export interface PropertyReport {
	reportItems: Array<ReportTableItem>;
	expenses: Array<Expense>;
	contract: Contract;
	calculations: PropertyReportCalculations;
}

export interface PropertyYearReport {
	occupancyRate: number;
	yearData: PropertyReport[];
}

export interface PropertyReportWithPropertyInfo extends PropertyReport {
	property: Property;
}
