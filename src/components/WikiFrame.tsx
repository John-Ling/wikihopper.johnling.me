import { useState } from "react";
import { WikipediaData } from "../types";
import "../css/wiki_frame.css";

export const WikiFrame: React.FC<{ wikiData: WikipediaData[] }> = ({ wikiData }) => {
	const [visibility, setVisiblity] = useState(true); // Determines which iframe is shown (true or 1 = 1st | false or 0 = 2nd)

	console.log(wikiData.length);
	let displayData = wikiData.map((data: WikipediaData) => {
		console.log("Mapped data");
		console.log(data);
	});

	return (
		<>
			{/* {wikiData ? <div dangerouslySetInnerHTML={{ __html: wikiData.parse.text['*'] }} /> : <p>Loading</p>} */}
		</>
	);
}