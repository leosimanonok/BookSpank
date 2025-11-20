import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";
import { IOpenLibraryService } from "@/client_service/OpenLibraryService";

export class OpenLibraryService implements IOpenLibraryService {

    async search(input: {
        title: string | null,
        author: string | null,
        limit: number,
        offset: number,
    },
        opts?: { signal?: AbortSignal }
    ): Promise<OpenLibrarySearchResponse[]> {
        if (input.title === null && input.author === null) {
            throw new Error("Need title or author to search...");
        }

        let params = new URLSearchParams();
        if (input.title) {
            params.append("title", input.title);
        }
        if (input.author) {
            params.append("author", input.author);
        }

        params.append("limit", `${input.limit}`);
        params.append("offset", `${input.offset}`);
        // what we want back
        params.append("fields", "key,title,author_name,cover_i");

        const res = await fetch(this.generateUrl(this.searchUrl, params), {
            headers: this.headers,
            signal: opts?.signal,
        });

        const data = await res.json();

        console.dir(data);

        return data.docs.map((x: any) => ({
            id: x.key,
            title: x.title,
            author: x.author_name?.[0] ?? "Unknown",
            coverId: x.cover_i ?? null,
            coverUrls: x.cover_i ? {
                S: OpenLibraryService.getCoverImageUrl(x.cover_i, "S"),
                M: OpenLibraryService.getCoverImageUrl(x.cover_i, "M"),
                L: OpenLibraryService.getCoverImageUrl(x.cover_i, "L"),
            }
                : null
        }));

    }

    private generateUrl(urlBase: string, params: URLSearchParams): URL {
        const url = new URL(urlBase);
        url.search = params.toString();
        return url;
    }


    static getCoverImageUrl(coverId: number, size: "S" | "M" | "L"): string {
        return `${this.coverUrl}/${coverId}-${size}.jpg`;
    }


    private readonly searchUrl = "https://openlibrary.org/search.json";
    private static readonly coverUrl = "https://covers.openlibrary.org/b/id";

    // see https://openlibrary.org/developers/api
    private readonly headers = new Headers({
        "User-Agent": "BookSpank/1.0 (leo@simanonok.net)"
    });
}