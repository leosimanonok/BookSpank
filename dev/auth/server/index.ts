import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { subjects } from "./subjects.js"
import { serve } from "@hono/node-server";


// Taken from backendService
async function getUser(email: string): Promise<{ id: number; username: string; } | null> {

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

// async function getUser(email: string) {
//     // Get user from database and return user ID
//     return {
//         id: 111,
//         username: "test"
//     }
// }


const app = issuer({
    subjects,
    storage: MemoryStorage(),
    providers: {
        code: CodeProvider(
            CodeUI({
                sendCode: async (claims, code) => {
                    if (!claims.email) {
                        throw new Error("No email received...");
                    }

                    const user = await getUser(claims.email);
                    if (!user) {
                        throw new Error("SPANKERS ONLY!!!!");
                    }

                    // TODO: On prod need to send actual email
                    // Otherwise, continue sending your code (email/SMS/etc.)
                    console.log(`✅ Sending code ${code} to ${claims.email}`);
                },
            }),
        ),
    },
    success: async (ctx, value) => {
        if (value.provider === "code") {
            const user = await getUser(value.claims.email);

            if (!user) {
                throw new Error("SPANKERS ONLY!!!!");
            }
            return ctx.subject("user", user)
        }
        throw new Error("Invalid provider")
    },
});

console.log(`Port: ${process.env.PORT ?? "No port found..."}`);

serve({
    ...app,
    port: parseInt(process.env.PORT ?? "3001")
}, (info) => {
    console.dir(info);
});

