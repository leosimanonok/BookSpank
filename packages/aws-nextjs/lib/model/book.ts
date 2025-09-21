export class Book {
    public readonly id: number;
    public readonly title: string;
    public readonly author: string;
    public readonly cover_id: number | null;
    public readonly started?: Date;
    public readonly finished?: Date;

    private constructor(
        id: number,
        title: string,
        author: string,
        cover_id: number | null,
        started?: Date,
        finished?: Date
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.cover_id = cover_id,
            this.started = started;
        this.finished = finished;
    }

    public static fromJSON(json: any): Book {
        if (
            !json.id ||
            !json.title ||
            !json.author
        ) {
            throw new Error("Invalid json for book creation...");
        }

        const started = json.started ? new Date(json.started) : undefined;
        const finished = json.finished ? new Date(json.finished) : undefined;

        return new Book(
            json.id,
            json.title,
            json.author,
            json.cover_id,
            started,
            finished
        );
    }
}
