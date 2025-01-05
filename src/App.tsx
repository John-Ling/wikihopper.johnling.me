import { useState, useEffect } from "react";
import { StatusBar } from "./components/StatusBar";
import { WikiFrame } from "./components/WikiFrame";
import { ResultsPage } from "./components/ResultsPage";
import { WikipediaData, ResultsData } from "./types";
import "./styles/app.scss";

import { clean_url, get_wikipedia_data } from "./utils";

function App() {
    const [startingTitle, setStartingTitle] = useState<string>(""); // Starting title where the player starts
    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [destinationTitle, setDestinationTitle] = useState<string>("");
    const [wikiData, setWikiData] = useState<WikipediaData[]>([]);
    const [hopCount, setHopCount] = useState(10);
    const [hops, setHops] = useState<string[]>([startingTitle]);
    const [visible, setVisible] = useState(true);  // Determines which iframe is shown (true or 1 = 1st | false or 0 = 2nd)
    const [resultsData, setResultsData] = useState<ResultsData>({} as ResultsData);
    const [loading, setLoading] = useState<boolean>(false);

    const handle_link_click = (event: any) => {
        event.preventDefault();

        if (loading) {
            return; // Disable link clicks when navigating to next page
        }

        setLoading(true);

        if (!visible){
            console.log("Clicked second page");
            setLoading(false);
            return; // Disable link clicks for second target page
        } 

        let title = clean_url(event.target.href);
        setCurrentTitle(title);
        setHopCount(hopCount - 1);
        setHops([...hops, title]);

        if (wikiData === undefined) {
            return;
        }

        let destinationPage: WikipediaData = wikiData[1];
        get_wikipedia_data(title)?.then(newPage => {
            setWikiData([newPage, destinationPage]);
            setLoading(false);
        });
    }

    useEffect(() => { // check if game is won or lost
        let visible: boolean = false;
        let won: boolean = false;
        if (currentTitle === destinationTitle && destinationTitle !== "") {
            visible = true;
            won = true;
        }

        if (hopCount == 0) {
            visible = true;
        }

        setResultsData({
            visible: visible,
            won: won, startTitle: startingTitle,
            endTitle: destinationTitle, 
            hopsTaken: 10 - hopCount, 
            hops: hops
        });
    }, [currentTitle, destinationTitle, hopCount])

    useEffect(() => { // Generates HTML of two random wikipedia articles
        const generate_wikipedia_titles = async (): Promise<any> => {
            const API_ENDPOINT: string = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=2&origin=*`;
            let data: Response = await fetch(API_ENDPOINT, { method: "GET" });
            let json = await data.json();
            let titles = json.query.random; 
            let index: number = 0;

            titles.forEach(async (title: any) => { // Get HTML data using wikipedia titles
                let data: WikipediaData | undefined = await get_wikipedia_data(title.title);
                if (data === undefined || blocked) {
                    return;
                }

                setWikiData(previous => [...previous, data || {} as WikipediaData]);

                index == 0 ? setStartingTitle(title.title) : setDestinationTitle(title.title);
                index++;
            });
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
    
    useEffect(() => { // change default link behaviour after wikipedia data is rendered
        let blocked: boolean = false;

        if (!blocked) {
            document.querySelectorAll('a').forEach(element => element.addEventListener("click", handle_link_click));
        }
        
        return () => {
            blocked = true;
        }
    });

    return (
        <>
            <StatusBar 
                hops={hopCount} 
                onToggleButtonClick={() => setVisible(visible => !visible)}
                titles={[startingTitle, destinationTitle]}
            />
            <div className="main-view">
                <WikiFrame visible={visible} wikiData={wikiData} />
                <ResultsPage data={resultsData} />
            </div>
        </>
    );
}

export default App;
