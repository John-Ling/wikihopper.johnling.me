import { WikipediaData } from "../types";

import "../css/wiki_frame.css";
import "../css/wikipedia.css";

import DOMPurify from "dompurify";

export const WikiFrame: React.FC<{ wikiData: WikipediaData[], visible: boolean }> = ({ wikiData, visible }) => {
	let wikiFrameA = <p>Loading...</p>;
	let wikiFrameB = <p>Loading...</p>;

	let displayData = wikiData.map((data: any) => 
		<div className="wiki-frame" id="wiki-frame">
			<h2>{data.parse.title}</h2>
			<div className="wiki-view" id="a-wiki-view" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.parse.text['*'])}}/>
		</div>
	);
	
	wikiFrameA = displayData[0];
	wikiFrameB = displayData[1];

	return (
		<>
			<div>
				{ visible ? wikiFrameA : wikiFrameB }
			</div>
		</>
	);
}