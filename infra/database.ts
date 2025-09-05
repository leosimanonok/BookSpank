import { vpc } from "./vpc";


export const database = new sst.aws.Postgres("MyDB", {
    dev: {
        username: "postgres",
        password: "password",
        database: "local",
        port: 5432
    },
    vpc
})