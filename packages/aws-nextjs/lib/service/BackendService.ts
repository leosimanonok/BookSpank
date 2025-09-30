/**
 * Class for communicating with backend api
 * Just a wrapper for fetch
 */

import { OpenLibrarySearchResponse } from "../dto/OpenLibrarySearchResponse";

export interface IBackendService {
    getUserBooks(userId: number, limit: number, offset: number): Promise<Response>;

    getCompletedBooks(limit: number, offset: number): Promise<Response>;

    postUserBook(userId: number, bookInfo: OpenLibrarySearchResponse): Promise<Response>;

    getUser(email: string): Promise<{ userId: number; username: string } | null>;

}
