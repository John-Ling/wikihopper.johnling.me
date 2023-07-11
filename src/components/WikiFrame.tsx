
import { WikipediaData } from "../types";
import "../css/wiki_frame.css";
import "../css/wikipedia.css";

export const WikiFrame: React.FC<{ wikiData: WikipediaData[], visible: boolean }> = ({ wikiData, visible }) => {
	let displayData = wikiData.map((data: WikipediaData) => 
		<>
			<h2>{data.parse.title}</h2>
			<div className="wiki-frame" dangerouslySetInnerHTML={{__html: data.parse.text['*']}}/>
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