import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { subjects } from "./subjects.js"
import { serve } from "@hono/node-server";

async function getUser(email: string) {
    // Get user from database and return user ID
    return 123;
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
            return ctx.subject("user", {
                id: await getUser(value.claims.email)
            })
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

