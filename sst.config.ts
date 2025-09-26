/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "bookspank",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: process.env.AWS_PROFILE ? {
        aws: {
          profile: process.env.AWS_PROFILE,
          region: process.env.AWS_REGION || "us-east-2"
        }
      } : {}
    };
  },
  async run() {
    // Skip AWS infrastructure if no AWS profile is set
    if (!process.env.AWS_PROFILE) {
      console.log("🚀 Running in local development mode (no AWS)");
      return {
        SITE_URL: "http://localhost:3000",
        AUTH_URL: "http://localhost:3001",
      }
    }

    const vpc = await import("./infra/vpc");
    const cluster = await import("./infra/cluster");
    const database = await import("./infra/database");
    const email = await import("./infra/email");
    const auth = await import("./infra/auth");
    const backend = await import("./infra/backend");
    const site = await import("./infra/site");

    return {
      SITE_URL: site.site.url,
      AUTH_URL: auth.auth.url,
    }
  },
});
