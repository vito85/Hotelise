export enum Channel {
	AIRBNB = "airbnb",
	BOOCKINGCOM = "bookingcom",
	VRBO = "vrbo",
	DIRECT = "direct",
	MANUAL = "manual",
	AIRBNB_OFFICIAL = "airbnb-official",
}

export enum CHANNEL_NAMES {
	BOOKING = "booking",
	AIRBNB = "airbnb",
	DIRECT = "direct",
	MANUAL = "manual",
	VRBO = "homeaway",
	AIRBNB_OFFICIAL = "airbnb-official",
}

export interface ChannelsSelectOption {
	value: CHANNEL_NAMES;
	label: string;
}
