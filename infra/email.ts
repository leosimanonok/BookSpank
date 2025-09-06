
export const email = new sst.aws.Email("MyEmail", {
    sender: $app.stage === "prod" ?
        "bookspank.com" :
        "leo+bookspank@simanonok.net"
})