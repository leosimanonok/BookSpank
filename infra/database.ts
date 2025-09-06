import { vpc } from "./vpc";

// TODO: Add to readme
// docker connect ``` psql -h localhost -u bookspank -d bookspank_dev ```

export const database = new sst.aws.Postgres("MyDB", {
    dev: {
        username: "bookspank",
        password: "password",
        database: "bookspank_dev",
        port: 5432,
    },
    vpc
})