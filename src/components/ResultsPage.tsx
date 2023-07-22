import "../css/results_page.css";
import { ResultsData } from "../types";

export const ResultsPage: React.FC<{ data: ResultsData }> = ({ data }) => {
	return (
		<>
			{
				data.visible 
					?
						<div id="results-page">
							<h2>{data.won ? "You Win" : "You Lose"}</h2>
							<p>{data.won ? `You went from ${data.startTitle} to ${data.endTitle}` : ""}</p>
						</div>
					: 
						<></>
			}
		</>
	);
}