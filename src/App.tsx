import { useState } from "react";
import { HopBar } from "./components/HopBar";
import { HopIcon } from "./types";
import "./css/app.css";

function App() {
    const [hopCount, setHopCount] = useState(10);
    let hopIcons: HopIcon[] = []
    for (let i = 0; i < hopCount; i++) {
        hopIcons.push({active: false});
    }
    hopIcons[0].active = true;

    return (
        <>
            <HopBar hopIcons={ hopIcons }></HopBar>
            <div className="main-view">
                <iframe id="wiki-iframe" src="https://en.wikipedia.org/wiki/Special:Random"></iframe>
            </div>
        </>
    )
}

export default App
