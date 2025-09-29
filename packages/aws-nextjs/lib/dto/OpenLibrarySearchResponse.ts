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