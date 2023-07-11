import "../css/status_bar.css";

export const StatusBar: React.FC<{hops: number, onToggleButtonClick(): void }> = ({ hops, onToggleButtonClick }) => {

	return (
		<>
			<div className="status-bar">
				<button className="toggle-view-button nav-item" onClick={onToggleButtonClick}>Change View</button>
				<p className="hop-counter nav-item">Hops Left: {hops}</p>
			</div>
		</>
	);
};