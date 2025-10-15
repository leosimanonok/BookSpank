import { ClubHistoryEntry } from "@/lib/model/ClubHistoryEntry";
import { IClubHistoryService } from "../BackendClubHistoryService";


export class ClubHistoryService implements IClubHistoryService {
    async getClubHistory(limit: number, offset: number): Promise<ClubHistoryEntry[]> {
        const backendQuery = new URL(this.baseUrl + "/history");

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
            return data.map(x => ClubHistoryEntry.fromJSON(x));
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getCurrent(): Promise<ClubHistoryEntry | null> {
        const backendQuery = new URL(this.baseUrl + "/current");
        const res = await fetch(backendQuery);

        if (!res.ok && res.status === 404) {
            return null;
        }
        else if (!res.ok) {
            throw new Error("Unable to get current...");
        }

        const data = await res.json();

        try {
            return ClubHistoryEntry.fromJSON(data);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    private readonly baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL + "/club";
}