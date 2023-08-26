import {
	ContractChannelSplitLabel,
	ContractChannelSplitOption,
} from "interfaces/contracts";

export const defaultContractChannelSplit = {
	airbnb: { value: 1, label: ContractChannelSplitLabel.HOTELISE },
	bookingcom: { value: 1, label: ContractChannelSplitLabel.HOTELISE },
	vrbo: { value: 1, label: ContractChannelSplitLabel.HOTELISE },
	direct: { value: 1, label: ContractChannelSplitLabel.HOTELISE },
};

export const channelSplitOptions = [
	{
		value: 1,
		label: ContractChannelSplitLabel.HOTELISE as string,
	},
	{
		value: 0,
		label: ContractChannelSplitLabel.OWNER as string,
	},
] as Array<ContractChannelSplitOption>;
