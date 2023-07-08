import { useState } from "react";
import { WikipediaData } from "../types";
import "../css/wiki_frame.css";
import "../css/wikipedia.css";

export const WikiFrame: React.FC<{ wikiData: WikipediaData[], visible: boolean }> = ({ wikiData, visible }) => {
	let displayData = wikiData.map((data: WikipediaData) => <div className="wiki-frame" dangerouslySetInnerHTML={{__html: data.parse.text['*']}}/>);
	let wikiFrameA = displayData ? displayData[0] : <p>Loading</p>;
	let wikiFrameB = displayData ? displayData[1] : <p>Loading</p>;
	return (
		<>
			{ visible ? wikiFrameA : wikiFrameB }
		</>
	);
}