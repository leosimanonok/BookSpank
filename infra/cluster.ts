import { vpc } from "./vpc";

export const cluster = new sst.aws.Cluster("MyCluster", { vpc });
