

export interface IClubHistoryService {
    getClubHistory(limit: number, offset: number): Promise<Response>;
    getCurrent(): Promise<Response>;
    completeBook(bookId: number): Promise<Response>;
}