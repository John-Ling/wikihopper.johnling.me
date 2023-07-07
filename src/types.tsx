export type HopIcon = {
	active: boolean;
};

export type WikipediaData = { // Format of JSON data received by calling the wikipedia API
	parse: {
		title: string;
		pageID: number;
		revID: number;
		text: {};
	}
};