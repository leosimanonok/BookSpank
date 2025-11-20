import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";

export interface IReadingListService {

    /**
     * Assuming currently all books are added to 
     * @param userId 
     * @param bookInfo 
     */
    addBook(userId: number, bookInfo: OpenLibrarySearchResponse): Promise<Response>;

    removeBook(userId: number, bookId: number): Promise<Response>;

    getReadingList(userId: number, limit: number, offset: number): Promise<Response>;

    /**
     * Assuming all books below will keep same position, all above new position will decrease? position by one
     * @param userId 
     * @param bookId 
     * @param newPosition 
     */
    updateWantToReadNext(userId: number, bookId: number, wantToReadNext: boolean): Promise<Response>;

}