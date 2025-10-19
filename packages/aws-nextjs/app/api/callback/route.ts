import { client, setTokens } from "../../auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const url = new URL(req.url);

    const params = Object.fromEntries(url.searchParams.entries());

    const { code, redirectTo, error, error_description } = params;

    // const code = url.searchParams.get("code")
    // const redirectTo = url.searchParams.get("redirectTo") ?? "/"

    // const error = url.searchParams.get("error");
    // const errorMessage = url.searchParams.get("error_description");

    if (error) {
        return NextResponse.redirect(`${url.origin}?error_description=${encodeURIComponent(error_description)}`);

    }


    const exchanged = await client.exchange(code!, `${url.origin}/api/callback?redirectTo=${encodeURIComponent(redirectTo ?? "/")}`)

    if (exchanged.err) return NextResponse.json(exchanged.err, { status: 400 })

    await setTokens(exchanged.tokens.access, exchanged.tokens.refresh)

    console.log(`redirectTo in callback: ${redirectTo}`);


    console.log(`${url.origin}${redirectTo}`);

    return NextResponse.redirect(`${url.origin}${redirectTo}`)
}