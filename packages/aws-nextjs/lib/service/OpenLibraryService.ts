import { OpenLibrarySearchResponse } from "../dto/OpenLibrarySearchResponse";

export class OpenLibraryService {

    static async search(input: {
        title?: string,
        author?: string,
    }, limit: number, offset: number): Promise<OpenLibrarySearchResponse[]> {
        if (typeof input.title === "undefined" && typeof input.author === "undefined") {
            throw new Error("Need title or author to search...");
        }

        let params = new URLSearchParams();
        if (typeof input.title !== "undefined") {
            params.append("title", input.title);
        }
        if (typeof input.author !== "undefined") {
            params.append("author", input.author);
        }

        params.append("limit", `${limit}`);
        params.append("offset", `${offset}`);

        const res = await fetch(this.generateUrl(this.searchUrl, params), {
            headers: this.headers,
        });

        const data = await res.json();

        return data.docs.map(x => {
            return {
                title: x.title,
                author: x.author_name,
                isbn: x.isbn,
                olid: x.olid,
                coverId: x.cover_i,
            }
        });

    }

    private static generateUrl(urlBase: string, params: URLSearchParams): URL {
        const url = new URL(urlBase);
        url.search = params.toString();
        return url;
    }


    static getCoverImageUrl(coverId: number, size: "S" | "M" | "L"): string {
        return `${this.coverUrl}/${coverId}-${size}.jpg`;
    }


    private static readonly searchUrl = "https://openlibrary.org/search.json";
    private static readonly coverUrl = "https://covers.openlibrary.org/b/id";

    // see https://openlibrary.org/developers/api
    private static readonly headers = new Headers({
        "User-Agent": "BookSpank/1.0 (leo@simanonok.net)"
    });
}