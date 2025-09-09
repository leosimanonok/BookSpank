import { cluster } from "./cluster";
import { database } from "./database";


export const backend = new sst.aws.Service("MyBackend", {
    cluster,
    loadBalancer: {
        public: false,
        rules: [
            { listen: "8080/http" }
        ]
    },
    image: {
        dockerfile: "packages/backend/Dockerfile",
    },
    dev: {
        url: "http://localhost:8080",
        command: "./build.sh",
        directory: "packages/"
    },
    link: [database]
});