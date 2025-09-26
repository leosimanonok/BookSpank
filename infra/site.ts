import { auth } from "./auth";
import { backend } from "./backend";
import { vpc } from "./vpc";


export const site = new sst.aws.Nextjs("MySite", {
    path: "packages/aws-nextjs",
    domain: $app.stage === "prod" ? "bookspank.com" : undefined,
    environment: {
        NEXT_PUBLIC_STAGE: $app.stage,
        NEXT_PUBLIC_SITE_URL: $app.stage === "prod" ? "https://bookspank.com" : "http://localhost:3000",
        NEXT_PUBLIC_AUTH_URL: $app.stage === "prod" ? auth.url : "http://localhost:3001",
        NEXT_PUBLIC_BACKEND_API_URL: backend.url,
    },
    link: [backend, auth],
    vpc
})