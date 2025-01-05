import { WikipediaData } from "../types";

import "../styles/wiki_frame.scss";
import "../styles/wikipedia.scss";

import DOMPurify from "dompurify";	

export const WikiFrame: React.FC<{ wikiData: WikipediaData[], visible: boolean }> = ({ wikiData, visible }) => {
	let wikiFrameA = <p>Loading...</p>;
	let wikiFrameB = <p>Loading...</p>;

	let displayData = wikiData.map((data: any) => 
		<div className="wiki-frame">
			<h2>{data.parse.title}</h2>
			<div className="wiki-view" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.parse.text['*'])}}/>
		</div>
	);
	
	wikiFrameA = displayData[0];
	wikiFrameB = displayData[1];

	return (
		<>
			{ visible ? wikiFrameA : wikiFrameB }
		</>
	);
}