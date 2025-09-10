import { auth } from "./auth";
import { backend } from "./backend";
import { vpc } from "./vpc";


export const site = new sst.aws.Nextjs("MySite", {
    path: "packages/aws-nextjs",
    domain: $app.stage === "prod" ? "bookspank.com" : undefined,
    environment: {
        NEXT_PUBLIC_STAGE: $app.stage,
        NEXT_PUBLIC_SITE_URL: $app.stage === "prod" ? "bookspank.com" : "localhost:3000",
        NEXT_PUBLIC_AUTH_URL: auth.url,
        NEXT_PUBLIC_API_URL: backend.url,
    },
    link: [backend, auth],
    vpc
})