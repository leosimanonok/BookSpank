/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "bookspank",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "leo-bookspank",
          region: "us-east-2"
        }
      }
    };
  },
  async run() {
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
