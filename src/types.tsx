export type WikipediaData = { // Format of JSON data received by calling the wikipedia API
	parse: {
		title: string;
		pageID: number;
		revID: number;
		text: {};
	}
};

export type ResultsData = {
	visible: boolean;
	won: boolean;
	startTitle: string;
	endTitle: string;
	hopsTaken: number;
};