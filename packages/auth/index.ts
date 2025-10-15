import { handle } from "hono/aws-lambda"
import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo"
import { subjects } from "./subjects"
import { BackendService } from "@/service/BackendServiceImpl";

async function getUser(email: string) {
    // Get user from database and return user ID
    return {
        id: 111,
        username: "test"
    }
}

const backendService = new BackendService();

const app = issuer({
    subjects,
    storage: DynamoStorage({
        table: "my-table",
        pk: "pk",
        sk: "sk"
    }),
    // Remove after setting custom domain
    allow: async () => true,
    providers: {
        code: CodeProvider(
            CodeUI({
                sendCode: async (claims, code) => {
                    if (!claims.email) {
                        throw new Error("No email received...");
                    }

                    const user = await backendService.getUser(claims.email);
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
            const user = await backendService.getUser(value.claims.email);
            if (!user) {
                throw new Error("SPANKERS ONLY!!!!");
            }
            return ctx.subject("user", user)
        }
        throw new Error("Invalid provider")
    },
})


export const handler = handle(app)