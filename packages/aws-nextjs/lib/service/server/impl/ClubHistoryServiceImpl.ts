import { IClubHistoryService } from "@/server_service/ClubHistoryService";

export class ClubHistoryService implements IClubHistoryService {
    getClubHistory(limit: number, offset: number): Promise<Response> {
        const backendQuery = new URL(this._url + "/history");

        const backendParams = new URLSearchParams();
        backendParams.set("limit", limit.toString());
        backendParams.set("offset", offset.toString());

        backendQuery.search = backendParams.toString();

        return fetch(backendQuery);
    }

    getCurrent(): Promise<Response> {
        const backendQuery = new URL(this._url + "/current");
        return fetch(backendQuery);
    }

    completeBook(userId: number, bookId: number): Promise<Response> {
        const query = new URL(this._url + "/current");
        return fetch(query, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                bookId,
            }),
        });
    }

    private readonly _url = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/club";
}