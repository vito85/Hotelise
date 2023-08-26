export interface PreferenceManualCleaningFeePrice {
	currency: "AMD" | "USD";
	amount: number;
}

export interface PreferenceManualCleaningFee {
	bedrooms: number;
	price: PreferenceManualCleaningFeePrice[];
}

export interface Preference {
	id?: string;
	ownerId?: string;
	defaultContractId?: string;
	directPaymentCommission: number;
	manualCleaningFees: Array<PreferenceManualCleaningFee>;
}
