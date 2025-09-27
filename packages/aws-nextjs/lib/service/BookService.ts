import { Book } from "@/model/book";

export interface IBookService {

    getCompleted(limit: number, offset: number): Promise<Book[]>;

    getUserBooks(userId: number, limit: number, offset: number): Promise<Book[]>
}