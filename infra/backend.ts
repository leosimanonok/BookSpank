import { cluster } from "./cluster";


export const backend = new sst.aws.Service("MyBackend", {
    cluster,
    loadBalancer: {
        public: false,
        rules: [
            { listen: "80/http" }
        ]
    },
    image: {
        dockerfile: "packages/backend/Dockerfile"
    },
    dev: {
        url: "http://localhost:8080"
    }
});