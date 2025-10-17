/**
 * Class for communicating with backend api
 * Just a wrapper for fetch
 */

import { IClubHistoryService } from "@/service/ClubHistoryService";
import { IReadingListService } from "@/service/ReadingListService";

export interface IBackendService {

    getUser(email: string): Promise<{ id: number; username: string } | null>;

    ClubHistory: IClubHistoryService;
    ReadingList: IReadingListService;

}
