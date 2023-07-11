import  React  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular} from "@fortawesome/free-regular-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { HopIcon } from "../types";
import "../css/hop_bar.css";

export const StatusBar: React.FC<{hopIcons: HopIcon[]}> = ({ hopIcons }) => {
	const icons = hopIcons.map((icon: HopIcon, index: number) => <HopIconComponent key={index} active={ icon.active }/>);
	return (
		<>
			<div className="hop-bar">{ icons }</div>
		</>
	);
};

const HopIconComponent: React.FC<{active: boolean}> = ({ active }) => {
	return (
		<>
			<span className="hop-icon">
				{ 
					active ?
						<span className="active"><FontAwesomeIcon icon={ faCircle }/></span>  
					: 
						<span><FontAwesomeIcon icon={ faCircleRegular }/></span>
				}
			</span>
		</>
	);
};