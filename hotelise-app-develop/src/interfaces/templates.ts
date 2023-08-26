export interface PropertiesTemplatePropertyDetailsCategoryField {
	name: string;
	value: string;
}

export interface PropertiesTemplatePropertyDetailsCategory {
	name: string;
	fields: PropertiesTemplatePropertyDetailsCategoryField[];
}

export interface PropertiesTemplatePropertyDetails {
	categories: PropertiesTemplatePropertyDetailsCategory[];
}

export interface PropertiesTemplate {
	id: string;
	propertyDetails: PropertiesTemplatePropertyDetails;
}
