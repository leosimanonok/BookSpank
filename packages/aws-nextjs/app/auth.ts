import { createClient, Client } from "@openauthjs/openauth/client";
import { cookies as getCookies } from "next/headers";

let client: Client;

// Try to use SST resources, fall back to mock if not available
if (process.env.NODE_ENV === "development") {
    // Local dev: use mock client
    client = createClient({
        clientID: "dev",
        issuer: "http://localhost:3001",
    });
} else {
    // Production: dynamically import SST Resource to avoid errors locally
    import("sst").then(({ Resource }) => {
        client = createClient({
            clientID: "nextjs",
            issuer: Resource.MyAuth.url,
        });
    });
}

export { client };

export async function setTokens(access: string, refresh: string) {
    const cookies = await getCookies()

    cookies.set({
        name: "access_token",
        value: access,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 34560000,
    })
    cookies.set({
        name: "refresh_token",
        value: refresh,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 34560000,
    })
}