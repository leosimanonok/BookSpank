import { IUserService } from "@/server_service/UserService";


export class UserService implements IUserService {
    async getUser(email: string): Promise<{ id: number; username: string; } | null> {

        const backendQuery = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`);
        const backendParams = new URLSearchParams();
        backendParams.set("email", email);

        backendQuery.search = backendParams.toString();

        const res = await fetch(backendQuery, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            if (res.status === 404) {
                return null;
            }
            throw new Error(`Failed to fetch user: ${res.statusText}`);
        }

        return res.json();
    }
}