export class Book {
    public readonly id: number;
    public readonly title: string;
    public readonly author: string;
    public readonly isbn: string;
    public readonly olid: string;
    public readonly started?: Date;
    public readonly finished?: Date;

    // Private constructor enforces using fromJSON
    private constructor(
        id: number,
        title: string,
        author: string,
        isbn: string,
        olid: string,
        started?: Date,
        finished?: Date
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.olid = olid;
        this.started = started;
        this.finished = finished;
    }

    // Static factory method to create a Book from JSON
    public static fromJSON(json: any): Book {
        const started = json.started ? new Date(json.started) : undefined;
        const finished = json.finished ? new Date(json.finished) : undefined;

        return new Book(
            json.id,
            json.title,
            json.author,
            json.isbn,
            json.olid,
            started,
            finished
        );
    }
}
