/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "bookspank",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = await import("./infra/vpc");
    const cluster = await import("./infra/cluster");
    const database = await import("./infra/database");
    const auth = await import("./infra/auth");
    const backend = await import("./infra/backend");
    const email = await import("./infra/email");
    const site = await import("./infra/email");

    return {
      SITE_URL: site.site.url,
      AUTH_URL: auth.auth.url,
    }

  },
});
