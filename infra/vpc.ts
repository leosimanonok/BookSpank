export const vpc = new sst.aws.Vpc("MyVPC", {
    nat: "ec2",
});