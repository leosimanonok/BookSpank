import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";
import { ReadingListEntry } from "@/model/ReadingListEntry";

export interface IReadingListService {

    /**
     * Assuming currently all books are added to 
     * @param userId 
     * @param bookInfo 
     */
    addBook(userId: number, bookInfo: OpenLibrarySearchResponse): Promise<void>;

    removeBook(userId: number, bookId: number): Promise<void>;

    getReadingList(userId: number, limit: number, offset: number): Promise<ReadingListEntry[]>;

    /**
     * Assuming all books below will keep same position, all above new position will decrease? position by one
     * @param userId 
     * @param bookId 
     * @param newPosition 
     */
    updateBookPosition(userId: number, bookId: number, origPosition: number, newPosition: number): Promise<void>;

}