import {
	CHANNEL_NAMES,
	Channel,
	ChannelsSelectOption,
} from "interfaces/channels";

export const getChannelName = (channel: CHANNEL_NAMES): Channel | string => {
	switch (channel) {
		case CHANNEL_NAMES.AIRBNB_OFFICIAL:
			return Channel.AIRBNB_OFFICIAL;
		case CHANNEL_NAMES.AIRBNB:
			return Channel.AIRBNB;
		case CHANNEL_NAMES.BOOKING:
			return Channel.BOOCKINGCOM;
		case CHANNEL_NAMES.DIRECT:
			return Channel.DIRECT;
		case CHANNEL_NAMES.VRBO:
			return Channel.VRBO;
		case CHANNEL_NAMES.MANUAL:
			return Channel.MANUAL;
		default:
			return "";
	}
};

export const channelsList = [
	{
		value: CHANNEL_NAMES.AIRBNB_OFFICIAL,
		label: "airbnb-official",
	},
	{
		value: CHANNEL_NAMES.AIRBNB,
		label: "airbnb",
	},
	{
		value: CHANNEL_NAMES.BOOKING,
		label: "bookingcom",
	},
	{
		value: CHANNEL_NAMES.VRBO,
		label: "vrbo",
	},
	{
		value: CHANNEL_NAMES.DIRECT,
		label: "direct",
	},
	{
		value: CHANNEL_NAMES.MANUAL,
		label: "manual",
	},
] as Array<ChannelsSelectOption>;
