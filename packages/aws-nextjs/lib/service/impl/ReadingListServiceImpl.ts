import { OpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";
import { IReadingListService } from "../ReadingListService";


export class ReadingListService implements IReadingListService {
    addBook(userId: number, bookInfo: OpenLibrarySearchResponse): Promise<Response> {
        const backendQuery = new URL(this.baseUrl + `/user/${userId}`);

        return fetch(backendQuery, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookInfo),
        });
    }

    removeBook(userId: number, bookId: number): Promise<Response> {
        const backendQuery = new URL(this.baseUrl + `/user/${userId}`);

        return fetch(backendQuery, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                bookId
            }),
        });
    }

    getReadingList(userId: number, limit: number, offset: number): Promise<Response> {
        const backendQuery = new URL(this.baseUrl + `/user/${userId}`);

        const backendParams = new URLSearchParams();
        backendParams.set("limit", limit.toString());
        backendParams.set("offset", offset.toString());

        backendQuery.search = backendParams.toString();

        return fetch(backendQuery);
    }

    updateBookPosition(userId: number, bookId: number, newPosition: number): Promise<Response> {
        const backendQuery = new URL(this.baseUrl + `/user/${userId}`);

        return fetch(backendQuery, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                bookId,
                newPosition,
            }),
        });
    }

    private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/readingList";

}