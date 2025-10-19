import { Book } from "@/model/Book";

export class ReadingListEntry {
    public readonly book: Book;
    public readonly wantToReadNext: boolean;

    private constructor(
        book: Book,
        wantToReadNext: boolean,
    ) {
        this.book = book;
        this.wantToReadNext = wantToReadNext;
    }

    public static fromJSON(json: any): ReadingListEntry {
        if (
            !json.book ||
            !json.wantToReadNext
        ) {
            throw new Error("Invalid json for ReadingListEntry creation...");
        }

        const book = Book.fromJSON(json.book);

        return new ReadingListEntry(
            book,
            json.wantToReadNext,
        )

    }
} 