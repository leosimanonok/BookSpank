import { Book } from "@/model/Book";

export class BookService {

    static async getCompleted(limit: number, offset: number): Promise<Book[]> {
        this.checkLimitOffset(limit, offset);

        const res = await fetch(`${this._url}/books/completed?offset=${offset}&limit=${limit}`, {
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

    static async getUserBooks(userId: number, limit: number, offset: number): Promise<Book[]> {
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


    private static checkLimitOffset(limit: number, offset: number) {
        if (limit <= 0) throw new RangeError("Limit must be greater than 0");
        if (offset < 0) throw new RangeError("Offset must be greater or equal to 0");
    }

    private static readonly _url = process.env.NEXT_PUBLIC_API_URL;
}