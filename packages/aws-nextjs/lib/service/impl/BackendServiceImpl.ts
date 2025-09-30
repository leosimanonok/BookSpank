import { OpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";
import { IBackendService } from "../BackendService";

export class BackendService implements IBackendService {
    getUserBooks(userId: number, limit: number, offset: number): Promise<Response> {
        const backendQuery = new URL(process.env.NEXT_PUBLIC_BACKEND_API_URL + `/books/user/${userId}`);
        const backendParams = new URLSearchParams();
        backendParams.set("limit", limit.toString());
        backendParams.set("offset", offset.toString());

        backendQuery.search = backendParams.toString();

        return fetch(backendQuery);
    }
    getCompletedBooks(limit: number, offset: number): Promise<Response> {
        const backendQuery = new URL(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/books/completed");
        const params = new URLSearchParams();
        params.set("limit", limit.toString());
        params.set("offset", offset.toString());

        backendQuery.search = params.toString();

        return fetch(backendQuery);
    }
    postUserBook(userId: number, bookInfo: OpenLibrarySearchResponse): Promise<Response> {
        const backendQuery = new URL(process.env.NEXT_PUBLIC_BACKEND_API_URL + `/books/user/${userId}`);
        const { title, author, coverId } = bookInfo;
        return fetch(backendQuery, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    title,
                    author,
                    cover_id: coverId
                }
            )
        });
    }

}