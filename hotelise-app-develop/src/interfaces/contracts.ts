export enum ContractsStatuses {
	ACTIVE = "ACTIVE",
	DISABLED = "DISABLED",
}

export enum ContractChannelSplitLabel {
	HOTELISE = "Hotelise",
	OWNER = "Owner",
}

export interface ContractChannelSplitOption {
	value: number;
	label: ContractChannelSplitLabel;
}

export interface ContractChannelSplit {
	airbnb: number;
	bookingcom: number;
	vrbo: number;
	direct: number;
}

export interface Contract {
	id?: string;
	propertyId?: string;
	status?: ContractsStatuses;
	hoteliseFee?: number;
	channelSplit?: ContractChannelSplit;
}
