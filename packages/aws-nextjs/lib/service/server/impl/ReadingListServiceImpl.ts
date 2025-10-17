import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";
import { IReadingListService } from "@/server_service/ReadingListService";

/**
 * All methods just forward response to backend, as api logic will handle failures
 */
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
                bookId
            }),
        });
    }

    async getReadingList(userId: number, limit: number, offset: number): Promise<Response> {
        const backendQuery = new URL(this.baseUrl + `/user/${userId}`);

        const backendParams = new URLSearchParams();
        backendParams.set("limit", limit.toString());
        backendParams.set("offset", offset.toString());

        backendQuery.search = backendParams.toString();

        return fetch(backendQuery);
    }

    updateBookPosition(userId: number, bookId: number, origPosition: number, newPosition: number): Promise<Response> {
        const backendQuery = new URL(this.baseUrl + `/user/${userId}`);

        return fetch(backendQuery, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookId,
                origPosition,
                newPosition,
            }),
        });
    }

    private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/readingList";

}