import { Book } from "@/model/Book";
import { OpenLibrarySearchResponse } from "../dto/OpenLibrarySearchResponse";

export interface IBookService {

    getCompleted(limit: number, offset: number): Promise<Book[]>;

    getUserBooks(userId: number, limit: number, offset: number): Promise<Book[]>;

    addBook(userId: number, bookInfo: OpenLibrarySearchResponse): Promise<void>;

    getCurrentBook(): Promise<Book | null>;
}