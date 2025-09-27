

import { Book } from "@/model/Book";
import { IBookService } from "../BookService";

export class BookService implements IBookService {

    async getCompleted(limit: number, offset: number): Promise<Book[]> {
        this.checkLimitOffset(limit, offset);

        console.dir(process.env);

        const res = await fetch(`${this._url}/books/completed?offset=${offset}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.status}`);
        }

        const data: any[] = await res.json();
        const books: Book[] = data.map(raw => Book.fromJSON(raw));

        return books;
    }

    async getUserBooks(userId: number, limit: number, offset: number): Promise<Book[]> {
        this.checkLimitOffset(limit, offset);
        const res = await fetch(`${this._url}/books/user/${userId}?offset=${offset}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.status}`);
        }

        const data = await res.json();
        return data;
    }


    private checkLimitOffset(limit: number, offset: number) {
        if (limit <= 0) throw new RangeError("Limit must be greater than 0");
        if (offset < 0) throw new RangeError("Offset must be greater or equal to 0");
    }

    private readonly _url = process.env.NEXT_PUBLIC_SITE_URL + "/api";

}