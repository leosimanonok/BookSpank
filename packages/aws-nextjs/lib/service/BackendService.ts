/**
 * Class for communicating with backend api
 * Just a wrapper for fetch
 */

import { IClubHistoryService } from "@/service/ClubHistoryService";
import { IReadingListService } from "@/service/ReadingListService";

export interface IBackendService {

    // If we ever allow more updates to user data, we should make this a service as well
    getUser(email: string): Promise<{ id: number; username: string } | null>;

    ClubHistory: IClubHistoryService;
    ReadingList: IReadingListService;

}
