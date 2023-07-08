import { useState, useEffect } from "react";
import { HopBar } from "./components/HopBar";
import { WikiFrame } from "./components/WikiFrame";
import { HopIcon } from "./types";
import "./css/app.css";

function App() {
    const [titles, setTitles] = useState<string[]>([]);
    const [hopCount, setHopCount] = useState(10);
    const [visible, setVisible] = useState(true);  // Determines which iframe is shown (true or 1 = 1st | false or 0 = 2nd)


    let hopIcons: HopIcon[] = []
    for (let i = 0; i < hopCount; i++) {
        hopIcons.push({active: false});
    }
    hopIcons[0].active = true;

    useEffect(() => { // Create two random wikipedia titles
        const generate_wikipedia_titles = async (): Promise<any> => {
            const API_ENDPOINT: string = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=2&origin=*`;
            let data: Response = await fetch(API_ENDPOINT, { method: "GET" });
            return data.json();
        }

        let blocked: boolean = false;
        generate_wikipedia_titles()
            .then(response => {
                let titles = response.query.random;

                titles.forEach((obj: any) => {
                    if (!blocked) {
                        setTitles(previous => [...previous, obj.title]);
                    }
                });
            })
            .catch(error => console.log(error));
        
        return () => {
            blocked = true;
        }
    }, []);

    return (
        <>
            <HopBar hopIcons={ hopIcons }></HopBar>
            <div className="main-view">
                <WikiFrame visible={visible} titles={titles} />
            </div>
            <button onClick={() => setVisible(!visible)}>Toggle</button>
        </>
    );
}

export default App
