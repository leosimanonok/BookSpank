

export interface IClubHistoryService {
    getClubHistory(limit: number, offset: number): Promise<Response>;
    getCurrent(): Promise<Response>;
    completeBook(userId: number, bookId: number): Promise<Response>;
}