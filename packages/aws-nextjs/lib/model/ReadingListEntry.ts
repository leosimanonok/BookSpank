import { Book } from "@/model/Book";

export class ReadingListEntry {
    public readonly book: Book;
    public readonly position: number;

    private constructor(
        book: Book,
        position: number,
    ) {
        if (position < 0) throw new Error(`Invalid book position: ${position}`);

        this.book = book;
        this.position = position;
    }

    public static fromJSON(json: any): ReadingListEntry {
        if (
            !json.book ||
            !json.position
        ) {
            throw new Error("Invalid json for ReadingListEntry creation...");
        }

        const book = Book.fromJSON(json.book);

        return new ReadingListEntry(
            book,
            json.position,
        )

    }
} 