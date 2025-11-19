export class Book {
    public readonly id: number;
    public readonly title: string;
    public readonly author: string;
    public readonly cover_id: number | null;

    private constructor(
        id: number,
        title: string,
        author: string,
        cover_id: number | null,
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.cover_id = cover_id;
    }

    public static fromJSON(json: any): Book {
        if (
            !json.id ||
            !json.title ||
            !json.author
        ) {
            throw new Error("Invalid json for book creation...");
        }

        return new Book(
            json.id,
            json.title,
            json.author,
            json.cover_id,
        );
    }
}
