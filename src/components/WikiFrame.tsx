import "../css/wiki_frame.css";

export const WikiFrame: React.FC<{ titles: string[], visible: boolean }> = ({ titles, visible }) => {
	let displayData = titles.map((title: string) => 
		<iframe className="wiki-frame" src={`https://en.wikipedia.org/wiki/${title.replace(/ /g, '_')}`} title={title}></iframe>
	);
	let wikiFrameA = displayData ? displayData[0] : <p>Loading</p>;
	let wikiFrameB = displayData ? displayData[1] : <p>Loading</p>;

	return (
		<>
			{visible ? wikiFrameA : wikiFrameB}
		</>
	);
}