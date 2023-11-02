import "../css/wikipedia.css";

import DOMPurify from "dompurify";

export const WikiFrameContent: React.FC<{wikiData: any}> = ({wikiData}) => {
	return (
		<>
			<div className="wiki-frame">
				<h2>{wikiData.parse.title}</h2>
				<div className="wiki-view" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(wikiData.parse.text['*'])}}/>
			</div>
		</>
	);
}