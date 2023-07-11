import { useState, useEffect } from "react";
import { StatusBar } from "./components/StatusBar";
import { WikiFrame } from "./components/WikiFrame";
import { WikipediaData } from "./types";
import "./css/app.css";

const cache: Map<string, Promise<WikipediaData>> = new Map();

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

function App() {
    const [titleA, setTitleA] = useState<string>(""); // Starting title where the player starts
    const [titleB, setTitleB] = useState<string>("");
    const [wikiData, setWikiData] = useState<WikipediaData[]>([]);
    const [hopCount, setHopCount] = useState(10);
    const [visible, setVisible] = useState(true);  // Determines which iframe is shown (true or 1 = 1st | false or 0 = 2nd)

    useEffect(() => { // Generates HTML of two random wikipedia articles
        const generate_wikipedia_titles = async (): Promise<any> => {
            const API_ENDPOINT: string = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=2&origin=*`;
            let data: Response = await fetch(API_ENDPOINT, { method: "GET" });
            let json = await data.json();
            let titles = json.query.random; 

            if (titleA === "") {
                console.log("");
            }

            titles.forEach((title: { id: number, title: string }) => { // Get HTML data using wikipedia titles
                if (!blocked) {
                    let searchTitle: string = title.title;
                    get_wikipedia_data(searchTitle)?.then(data => {
                        setWikiData(previous => [...previous, data]);
                    });
                }
            });

            setTitleA(titles[0].title);
            setTitleB(titles[1].title);
            return;
        }

        let blocked: boolean = false;
        if (!blocked) generate_wikipedia_titles();

        return () => {
            blocked = true;
        }
    }, []);

    useEffect(() => {
        let blocked: boolean = false;

        if (!blocked) {
            document.querySelectorAll('a').forEach(element => {
                element.addEventListener("click", (event: any) => {
                    event.preventDefault();

                    if (!visible) return; // Disable link clicks for second target page

                    let targetURL: string = event.target.href;
                    let title: string = targetURL.split("/wiki/")[1];
                    title = title.replace(/_/g, ' ');
                    setTitleA(title);
    
                    if (title === titleB) {
                        console.log("Match");
                    } else {
                        if (!blocked) setHopCount(previous => previous - 1);
                    }
    
                    get_wikipedia_data(targetURL.split("/wiki/")[1])?.then(data => setWikiData(previous => [data, previous[1]]));
                });
            });
        }

        return () => {
            blocked = true;
        }
    });

    return (
        <>
            <div className="main-view">
                <StatusBar hops={hopCount} onToggleButtonClick={() => setVisible(!visible)}/>
                <WikiFrame visible={visible} wikiData={wikiData} />
            </div>
        </>
    );
}

export default App
