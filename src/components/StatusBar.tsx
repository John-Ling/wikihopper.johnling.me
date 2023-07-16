import "../css/status_bar.css";

export const StatusBar: React.FC<{hops: number, onToggleButtonClick(): void, titles: string[] }> = ({ hops, onToggleButtonClick, titles }) => {
	let pageLabels: JSX.Element[] = titles.map((title: string, index: number) => title ? <p>{index == 0 ? "Start" : "Target"}: {title}</p> : <p>Loading...</p>);

	return (
		<>
			<div className="status-bar">
				<div className="nav-item button-counter-pair">
					<p><button className="toggle-view-button" onClick={onToggleButtonClick}>Change View</button></p>
					<p className="hop-counter">Hops Left: {hops}</p>
				</div>
				<div className="nav-item">
					{pageLabels}
				</div>
			</div>
		</>
	);
};