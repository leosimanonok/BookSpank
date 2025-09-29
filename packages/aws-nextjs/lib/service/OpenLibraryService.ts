import { OpenLibrarySearchResponse } from "../dto/OpenLibrarySearchResponse";

export interface IOpenLibraryService {

    search(input: {
        title: string | null,
        author: string | null,
        limit: number,
        offset: number,
    }): Promise<OpenLibrarySearchResponse[]>;

    getCoverImageUrl(coverId: number, size: "S" | "M" | "L"): string;
}