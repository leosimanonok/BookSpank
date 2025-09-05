

export const email = sst.aws.Email("MyEmail",
    $app.stage === "prod" ?
        "bookspank.com" :
        "leo@simanonok.net"
)