import { useState, useEffect } from "react";
import { HopBar } from "./components/HopBar";
import { WikiFrame } from "./components/WikiFrame";
import { HopIcon, WikipediaData } from "./types";
import "./css/app.css";

const cache: Map<string, Promise<WikipediaData>> = new Map();

function App() {
    const [titles, setTitles] = useState<string[]>([]);
    const [wikiData, setWikiData] = useState<WikipediaData[]>([]);
    const [hopCount, setHopCount] = useState(10);


    let hopIcons: HopIcon[] = []
    for (let i = 0; i < hopCount; i++) {
        hopIcons.push({active: false});
    }
    hopIcons[0].active = true;

    useEffect(() => { // Create two random wikipedia titles
        console.log("First");
        const generate_wikipedia_titles = async (n: number): Promise<any> => { // Generates n random wikipedia titles
            const API_ENDPOINT: string = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=${n}&origin=*`;
            let data: Response = await fetch(API_ENDPOINT, { method: "GET" });
            return data.json();
        }

        let blocked: boolean = false;
        generate_wikipedia_titles(2)
            .then(response => {
                let titles = response.query.random;
                let tmp: string[] = [];
                titles.forEach((obj: any) => {
                    if (!blocked) {
                        console.log(obj.title);
                        tmp.push(obj.title);
                    }
                })
                setTitles(tmp);
            })
            .catch(error => console.log(error));
        return () => {
            blocked = true;
        }
    }, []);

    useEffect(() => { // Create wikipedia data using those titles
        console.log("Second");
        const fetch_wikipedia_data = async (title: string): Promise<WikipediaData> => {
            const API_ENDPOINT: string = `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`;
            let data: Response = await fetch(API_ENDPOINT, { method: "GET" });
            return data.json();
        }

        const get_wikipedia_data = (title: string): Promise<WikipediaData> | undefined => {
            if (!cache.has(title)) {
                cache.set(title, fetch_wikipedia_data(title));
            }
            return cache.get(title);
        }

        let blocked: boolean = false;
        titles.forEach((title: string) => {
            if (!blocked) { 
                get_wikipedia_data(title)?.then(data => {
                    console.log(data);
                    setWikiData([...wikiData, data]);
                });
            }
        })
        return () => {
            blocked = true;
        }
    }, []);
    
    return (
        <>
            <HopBar hopIcons={ hopIcons }></HopBar>
            <div className="main-view">
                {/* {visibility ? { wikiData ? <WikiFrame wikiData={wikiData[0]}/> : <p>Loading</p>} : <p>Hello</p>} */}
                { wikiData.map((data: WikipediaData) => <div dangerouslySetInnerHTML={{ __html: data.parse.text['*']}}/>)}
                {/* {wikiData ? <div dangerouslySetInnerHTML={{ __html: wikiData.parse.text['*'] }} /> : <p>Loading</p>} */}
            </div>
        </>
    );
}

export default App
