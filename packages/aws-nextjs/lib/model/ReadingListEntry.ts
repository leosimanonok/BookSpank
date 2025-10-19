import { Book } from "@/model/Book";
import { IBookEntry } from "@/model/BookEntry";

export class ReadingListEntry implements IBookEntry {
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
            json.wantToReadNext === undefined
        ) {
            console.dir(json);
            throw new Error("Invalid json for ReadingListEntry creation...");
        }

        const book = Book.fromJSON(json.book);

        return new ReadingListEntry(
            book,
            json.wantToReadNext,
        )

    }
} 