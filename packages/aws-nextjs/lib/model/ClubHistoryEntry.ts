import { Book } from "@/lib/model/Book";

export class ClubHistoryEntry {
    public readonly id: number;
    public readonly book: Book;
    public readonly selected_by: number;
    public readonly started?: Date;
    public readonly finished?: Date;

    private constructor(
        id: number,
        selected_by: number,
        book: Book,
        started?: Date,
        finished?: Date,
    ) {
        this.id = id;
        this.selected_by = selected_by;
        this.book = book;
        this.started = started;
        this.finished = finished;
    }

    public static fromJSON(json: any): ClubHistoryEntry {
        if (
            !json.id ||
            !json.selected_by ||
            !json.book
        ) {
            throw new Error("Invalid json for ClubHistoryEntry creation...");
        }

        const book = Book.fromJSON(json.book);

        const started = json.started ? new Date(json.started) : undefined;
        const finished = json.finished ? new Date(json.finished) : undefined;

        return new ClubHistoryEntry(
            json.id,
            json.selected_by,
            book,
            started,
            finished,
        )

    }
} 