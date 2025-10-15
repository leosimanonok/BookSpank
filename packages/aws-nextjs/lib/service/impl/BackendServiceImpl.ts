import { OpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";
import { IBackendService } from "../BackendService";
import { ClubHistoryService } from "./ClubHistoryServiceImpl";

export class BackendService implements IBackendService {
    History: ClubHistoryService = new ClubHistoryService();


    async getUser(email: string): Promise<{ id: number; username: string; } | null> {

        const backendQuery = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`);
        const backendParams = new URLSearchParams();
        backendParams.set("email", email);

        backendQuery.search = backendParams.toString();

        const res = await fetch(backendQuery, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            throw new Error(`Failed to fetch user: ${res.statusText}`);
        }

        return res.json();
    }
    // TODO: Should I just return books from here instead of response?
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
        const backendParams = new URLSearchParams();
        backendParams.set("limit", limit.toString());
        backendParams.set("offset", offset.toString());

        backendQuery.search = backendParams.toString();

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