import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";

export interface IClubHistoryService {
    getClubHistory(limit: number, offset: number): Promise<ClubHistoryEntry[]>;
    getCurrent(): Promise<ClubHistoryEntry>;
    completeCurrent(userId: number, bookId: number): Promise<ClubHistoryEntry>;
}