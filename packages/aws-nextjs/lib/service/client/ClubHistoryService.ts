import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";

export interface IClubHistoryService {
    getClubHistory(limit: number, offset: number): Promise<ClubHistoryEntry[]>;
    getCurrent(): Promise<ClubHistoryEntry>;
    completeBook(bookId: number): Promise<ClubHistoryEntry>;
}