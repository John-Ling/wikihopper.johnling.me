export type WikipediaData = { // Format of JSON data received by calling the wikipedia API
	parse: {
		title: string;
		pageID: number;
		revID: number;
		text: {};
	}
};

export type TitlesObj = {
	current: string;
	start: string;
	destination: string;
}

export type ResultsData = {
	visible: boolean;
	won: boolean;
};