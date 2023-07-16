import { useState, useEffect } from "react";
import { StatusBar } from "./components/StatusBar";
import { WikiFrame } from "./components/WikiFrame";
import { ResultsPage } from "./components/ResultsPage";
import { Footer } from "./components/Footer";
import { WikipediaData, ResultsData } from "./types";
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
    const [startingTitle, setStartingTitle] = useState<string>(""); // Starting title where the player starts
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [destinationTitle, setDestinationTitle] = useState<string>("");
    const [wikiData, setWikiData] = useState<WikipediaData[]>([]);
    const [hopCount, setHopCount] = useState(10);
    const [visible, setVisible] = useState(true);  // Determines which iframe is shown (true or 1 = 1st | false or 0 = 2nd)
    const [resultsData, setResultsData] = useState<ResultsData>({visible: false, won: false});

    useEffect(() => {
        let visible: boolean = false;
        let won: boolean = false;
        if (currentTitle === destinationTitle && destinationTitle !== "") {
            console.log("You Win");
            visible = true;
            won = true;
        }

        if (hopCount == 0) {
            console.log("You Lose");
            visible = true;
        }

        setResultsData({visible: visible, won: won});
    }, [currentTitle, destinationTitle, hopCount])

    useEffect(() => { // Generates HTML of two random wikipedia articles
        const generate_wikipedia_titles = async (): Promise<any> => {
            // const API_ENDPOINT: string = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=2&origin=*`;
            // let data: Response = await fetch(API_ENDPOINT, { method: "GET" });
            // let json = await data.json();
            // let titles = json.query.random; 

            let titles = [{ id: 65243424, ns: 0, title: "Sophie Wachner" }, { id: 24370563, ns: 0, title: "Selznick International Pictures" }];
            titles.forEach(async (title: any) => { // Get HTML data using wikipedia titles
                    let data: WikipediaData | undefined = await get_wikipedia_data(title.title);
                    if (data === undefined) {
                        console.log("undefined data");
                        return;
                    };

                    if (!blocked) setWikiData(previous => [...previous, data || {} as WikipediaData]);
            });
            
            setStartingTitle(titles[0].title);
            setDestinationTitle(titles[1].title);
            return;
        }

        let blocked: boolean = false;
        if (startingTitle === "" && destinationTitle === "") {
            generate_wikipedia_titles();
        }

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
                    title = title.split("#")[0]; // Remove any id tags
                    // title = title.replace(/ /g, "_");
                    setCurrentTitle(title.replace(/_/g, " "));
                    setHopCount(hopCount - 1);

                    if (wikiData === undefined) return;
                    let destinationPage: WikipediaData = wikiData[1];

                    get_wikipedia_data(title)?.then(newPage => setWikiData([newPage, destinationPage]));
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
                <StatusBar hops={hopCount} onToggleButtonClick={() => setVisible(visible => !visible)} titles={[startingTitle, destinationTitle]}/>
                <WikiFrame visible={visible} wikiData={wikiData} />
                <ResultsPage data={resultsData} />
            </div>
        </>
    );
}

export default App;