import { WikipediaData } from "./types";

export const cache: Map<string, Promise<WikipediaData>> = new Map();

const fetch_wikipedia_data = async (title: string): Promise<WikipediaData> => {
    const API_ENDPOINT: string = `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`;
    let data: Response = await fetch(API_ENDPOINT, { method: "GET" });
    return data.json();
}

export const get_wikipedia_data = (title: string): Promise<WikipediaData> | undefined => {
    if (!cache.has(title)) {
        cache.set(title, fetch_wikipedia_data(title));
    }
    return cache.get(title);
}

export const clean_url = (url: string): string => {
    let title: string = url.split("/wiki/")[1];

    if (title.includes('#')) {
        title = title.split('#')[0]; // Remove any id tags
    }

    let updated: string = title.replace(/_/g, ' ');
    return updated;
}