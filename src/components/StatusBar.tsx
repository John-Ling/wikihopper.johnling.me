import { useState } from "react";
import "../styles/status_bar.scss";


interface StatusBarProps {
	hops: number,
	onToggleButtonClick: () => void;
	titles: string[];
};

export const StatusBar: React.FC<StatusBarProps> = ({ hops, onToggleButtonClick, titles }) => {
	const [position, setPosition] = useState<number>(0); // saved scroll-y position of the content prior to switching 

	const toggle_button_click = () => {
		// this allows the scroll position of the current page to be stored when switching
		// once we switch back we can "load" that position so we are back where we started
		
		// this works because when React state is updated its actual value will only apply on the next re-painting
		// since when we switch we haven't rendered yet the page scroll 
		// to the stale value of position which is like "loading" the previous position
		// quite a cool snippet of code that I created accidentally
		setPosition(window.scrollY);
		window.scrollTo(0, position);
		onToggleButtonClick();
	}

	let pageLabels: JSX.Element[] = titles.map((title: string, index: number) => 
		title ? <p>{index == 0 ? "Start" : "Target"} : {title}</p> : <p>Loading...</p>);

	return (
		<>
			<div className="status-bar">
				<div className="nav-item button-counter-pair">
					<p><button id="toggle-view-button" onClick={toggle_button_click}>Change View</button></p>
					<p className="hop-counter">Hops Left: {hops}</p>
				</div>
				<div className="nav-item">
					{pageLabels}
				</div>
			</div>
		</>
	);
};