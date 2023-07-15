import { WikipediaData } from "../types";
import "../css/wiki_frame.css";
import "../css/wikipedia.css";

export const WikiFrame: React.FC<{ wikiData: WikipediaData[], visible: boolean }> = ({ wikiData, visible }) => {
	if (wikiData === undefined) {
		console.log("Undefined");
		return;
	}

	let displayData = wikiData.map((data: any) => 
		<>
			<div className="wiki-frame">
				<h2>{data.parse.title}</h2>
				<div className="wiki-view" dangerouslySetInnerHTML={{__html: data.parse.text['*']}}/>
			</div>
		</>
	);
	
	let wikiFrameA = displayData ? displayData[0] : <p>Loading</p>;
	let wikiFrameB = displayData ? displayData[1] : <p>Loading</p>;

	return (
		<>
			<div>
				{ visible ? wikiFrameA : wikiFrameB }
			</div>
		</>
	);
}