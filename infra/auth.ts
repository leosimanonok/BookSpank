import { database } from "./database";
import { email } from "./email";
import { vpc } from "./vpc";


export const auth = new sst.aws.Auth("MyAuth", {
    issuer: {
        handler: "packages/auth/index.handler",
        link: [database, email],
        vpc,

    },
    domain: $app.stage === "prod" ? "auth.bookspank.com" : undefined,
})