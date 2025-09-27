import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { subjects } from "./subjects.js"
import { serve } from "@hono/node-server";


async function getUser(email: string) {
    // Get user from database and return user ID
    return {
        id: 111,
        username: "test"
    }
}


const app = issuer({
    subjects,
    storage: MemoryStorage(),
    providers: {
        code: CodeProvider(
            CodeUI({
                sendCode: async (email, code) => {
                    console.log(email, code)
                },
            }),
        ),
    },
    success: async (ctx, value) => {
        if (value.provider === "code") {
            const user = await getUser(value.claims.email);
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

