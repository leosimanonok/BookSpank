import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";

export interface IClubHistoryService {
    getClubHistory(limit: number, offset: number): Promise<ClubHistoryEntry[]>;
    getCurrent(): Promise<ClubHistoryEntry>;
    completeBook(userId: number, bookId: number): Promise<ClubHistoryEntry>;
}