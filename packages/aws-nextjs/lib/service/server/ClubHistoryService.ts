

export interface IClubHistoryService {
    getClubHistory(limit: number, offset: number): Promise<Response>;
    getCurrent(): Promise<Response>;
    completeCurrent(userId: number, bookId: number): Promise<Response>;
}