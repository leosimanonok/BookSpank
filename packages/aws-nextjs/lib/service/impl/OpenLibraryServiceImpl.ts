import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";
import { IOpenLibraryService } from "@/service/OpenLibraryService";

export class OpenLibraryService implements IOpenLibraryService {

    async search(input: {
        title: string | null,
        author: string | null,
        limit: number,
        offset: number,
    }): Promise<OpenLibrarySearchResponse[]> {
        if (input.title === null && input.author === null) {
            throw new Error("Need title or author to search...");
        }

        let params = new URLSearchParams();
        if (input.title !== null) {
            params.append("title", input.title);
        }
        if (input.author !== null) {
            params.append("author", input.author);
        }

        params.append("limit", `${input.limit}`);
        params.append("offset", `${input.offset}`);
        // what we want back
        params.append("fields", "title,author_name,cover_i");

        const res = await fetch(this.generateUrl(this.searchUrl, params), {
            headers: this.headers,
        });

        const data = await res.json();

        return data.docs.map((x: any) => ({
            title: x.title,
            author: x.author_name?.[0] ?? "Unknown",
            coverId: x.cover_i ?? null,
        }));

    }

    private generateUrl(urlBase: string, params: URLSearchParams): URL {
        const url = new URL(urlBase);
        url.search = params.toString();
        return url;
    }


    getCoverImageUrl(coverId: number, size: "S" | "M" | "L"): string {
        return `${this.coverUrl}/${coverId}-${size}.jpg`;
    }


    private readonly searchUrl = "https://openlibrary.org/search.json";
    private readonly coverUrl = "https://covers.openlibrary.org/b/id";

    // see https://openlibrary.org/developers/api
    private readonly headers = new Headers({
        "User-Agent": "BookSpank/1.0 (leo@simanonok.net)"
    });
}