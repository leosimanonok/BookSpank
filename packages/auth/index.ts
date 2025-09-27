import { handle } from "hono/aws-lambda"
import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { DynamoStorage } from "@openauthjs/openauth/storage/dynamo"
import { subjects } from "./subjects"

async function getUser(email: string) {
    // Get user from database and return user ID
    return {
        id: 111,
        username: "test"
    }
}

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
})


export const handler = handle(app)