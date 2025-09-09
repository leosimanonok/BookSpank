import { vpc } from "./vpc";

export const database = new sst.aws.Postgres("MyDB", {
    dev: {
        username: "bookspank",
        password: "password",
        database: "bookspank_dev",
        port: 5432,
    },
    vpc
});