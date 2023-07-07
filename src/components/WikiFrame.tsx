import { useState } from "react";
import { WikipediaData } from "../types";
import "../css/wiki_frame.css";

export const WikiFrame: React.FC<{ wikiData: WikipediaData[] }> = ({ wikiData }) => {
	const [visibility, setVisiblity] = useState(true); // Determines which iframe is shown (true or 1 = 1st | false or 0 = 2nd)

	console.log(wikiData);
	//let displayData = wikiData.map((data: WikipediaData) => { <div dangerouslySetInnerHTML={{ __html: data.parse.text['*'] }}/> });
	let displayData = wikiData.map((data: WikipediaData) => <div class="wiki-frame" dangerouslySetInnerHTML={{__html: data.parse.text['*']}}/>);
	let wikiFrameA = displayData[0];
	let wikiFrameB = displayData[1];
	return (
		<>
			{/* {wikiData ? <div dangerouslySetInnerHTML={{ __html: wikiData.parse.text['*'] }} /> : <p>Loading</p>} */}
			{ visibility ? wikiFrameA : wikiFrameB }
			<button onClick={() => setVisiblity(!visibility)}>Click me</button>
		</>
	);
}