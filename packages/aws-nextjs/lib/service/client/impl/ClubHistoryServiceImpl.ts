import { IClubHistoryService } from "@/client_service/ClubHistoryService";
import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";

export class ClubHistoryService implements IClubHistoryService {
    async getClubHistory(limit: number, offset: number): Promise<ClubHistoryEntry[]> {
        const query = new URL(this._url + "/history");

        const params = new URLSearchParams();
        params.set("limit", limit.toString());
        params.set("offset", offset.toString());

        query.search = params.toString();

        const res = await fetch(query);

        if (!res.ok) {
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

    async getCurrent(): Promise<ClubHistoryEntry> {
        const query = new URL(this._url + "/current");
        const res = await fetch(query);

        if (!res.ok) {
            throw new Error("Unable to get current entry...");
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

    async completeBook(userId: number, bookId: number): Promise<ClubHistoryEntry> {
        const query = new URL(this._url + "/current");
        const res = await fetch(query, {
            method: "PATCH",
            body: JSON.stringify({
                userId,
                bookId,
            }),
        });

        if (!res.ok) {
            throw new Error("Unable to complete current entry...");
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

    private readonly _url = process.env.NEXT_PUBLIC_SITE_URL + "/api/club";
}