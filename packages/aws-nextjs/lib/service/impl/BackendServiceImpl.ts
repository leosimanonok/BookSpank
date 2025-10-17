import { OpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";
import { IBackendService } from "@/service/BackendService";
import { ClubHistoryService } from "@/service/ClubHistoryServiceImpl";
import { IReadingListService } from "@/service/ReadingListService";
import { IClubHistoryService } from "@/service/ClubHistoryService";
import { ReadingListService } from "./ReadingListServiceImpl";

export class BackendService implements IBackendService {
    ReadingList: IReadingListService = new ReadingListService();
    ClubHistory: IClubHistoryService = new ClubHistoryService();


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
}