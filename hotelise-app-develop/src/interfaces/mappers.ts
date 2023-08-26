import { CHANNEL_NAMES } from "./channels";

export interface Mapper {
	id?: string;
	channel?: CHANNEL_NAMES;
	field?: string;
	override_value?: string;
}
