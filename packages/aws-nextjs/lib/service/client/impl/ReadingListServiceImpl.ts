import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";
import { IReadingListService } from "@/client_service/ReadingListService";
import { ReadingListEntry } from "@/model/ReadingListEntry";


export class ReadingListService implements IReadingListService {
    async addBook(userId: number, bookInfo: OpenLibrarySearchResponse): Promise<void> {
        const backendQuery = new URL(this._url + `/user/${userId}`);

        const res = await fetch(backendQuery, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookInfo),
        });
    }

    async removeBook(userId: number, bookId: number): Promise<void> {
        const backendQuery = new URL(this._url + `/user/${userId}`);

        await fetch(backendQuery, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookId
            }),
        });
    }

    async getReadingList(userId: number, limit: number, offset: number): Promise<ReadingListEntry[]> {
        const backendQuery = new URL(this._url + `/user/${userId}`);

        const backendParams = new URLSearchParams();
        backendParams.set("limit", limit.toString());
        backendParams.set("offset", offset.toString());

        backendQuery.search = backendParams.toString();

        const res = await fetch(backendQuery);

        if (!res.ok) {
            // TODO: Decide how to handle
            throw new Error("Unable to get history...");
        }

        const data: any[] = await res.json();

        try {
            return data.map(x => ReadingListEntry.fromJSON(x));
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateWantToReadNext(userId: number, bookId: number, wantToReadNext: boolean): Promise<void> {
        const backendQuery = new URL(this._url + `/user/${userId}`);

        await fetch(backendQuery, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookId,
                wantToReadNext
            }),
        });
    }

    private readonly _url = process.env.NEXT_PUBLIC_SITE_URL + "/api/readingList";

}