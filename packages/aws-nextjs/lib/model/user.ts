export class User {
    public readonly id: number;
    public readonly email: string;
    public readonly username?: string;

    // Private constructor enforces using fromJSON
    private constructor(id: number, email: string, username?: string) {
        this.id = id;
        this.email = email;
        this.username = username;
    }

    // Static factory method to create a User from JSON
    public static fromJSON(json: any): User {
        return new User(
            json.id,
            json.email,
            json.username
        );
    }
}
