import { cookies as getCookies } from "next/headers"

// Mock client for local development when SST resources aren't available
const mockClient = {
    verify: async () => ({
        err: false,
        subject: {
            type: "user",
            properties: {
                id: "local-user-123",
                email: "local@example.com"
            }
        },
        tokens: null
    }),
    authorize: async (redirectUrl: string) => ({
        url: `${redirectUrl}?code=mock-code`
    })
};

// Try to use SST resources, fall back to mock if not available
let client: typeof mockClient;

try {
    const { Resource } = require("sst");
    const { createClient } = require("@openauthjs/openauth/client");
    client = createClient({
        clientID: "nextjs",
        issuer: Resource.MyAuth.url
    });
} catch (error) {
    console.log("SST not available, using mock authentication for local development");
    client = mockClient;
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