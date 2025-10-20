import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";
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

    completeCurrent(userId: number, bookId: number): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    private readonly _url = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/club";
}