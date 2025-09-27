import { Book } from "@/model/Book";

export interface IBookService {

    getCompleted(limit: number, offset: number): Promise<Book[]>;

    getUserBooks(userId: number, limit: number, offset: number): Promise<Book[]>
}