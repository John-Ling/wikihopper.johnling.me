import React, { useState, useEffect } from "react";
import "../css/status_bar.css";

export const StatusBar: React.FC<{hops_: number}> = ({ hops_ }) => {
	const [hops, setHops] = useState(hops_);

	return (
		<>
			<div className="status-bar">
				<button className="toggle-view-button" onClick={() => console.log("hello")}>Change View</button>
				<p className="hop-counter">Hops Left: {hops}</p>
			</div>
		</>
	);
};