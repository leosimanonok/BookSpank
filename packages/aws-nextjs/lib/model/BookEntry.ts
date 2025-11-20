import { Book } from "@/model/Book";
import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";
import { ReadingListEntry } from "@/model/ReadingListEntry";

export interface IBookEntry {
    readonly book: Book;
}

export function isClubHistoryEntry(value: IBookEntry): value is ClubHistoryEntry {
    return value instanceof ClubHistoryEntry;
}

export function isReadingListEntry(value: IBookEntry): value is ReadingListEntry {
    return value instanceof ReadingListEntry;
}