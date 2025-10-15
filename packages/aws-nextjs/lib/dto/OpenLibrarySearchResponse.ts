export type OpenLibrarySearchResponse = {
    id: string,
    title: string,
    author: string,
    coverId: number | null,
    coverUrls: {
        S: string,
        M: string,
        L: string,
    } | null;
}


export function isOpenLibrarySearchResponse(obj: any): obj is OpenLibrarySearchResponse {
    return (
        obj &&
        typeof obj === "object" &&
        typeof obj.id === "string" &&
        typeof obj.title === "string" &&
        typeof obj.author === "string"
    );
}