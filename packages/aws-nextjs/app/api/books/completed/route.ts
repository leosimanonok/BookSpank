import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    const limitStr = searchParams.get("limit");
    const offsetStr = searchParams.get("offset");

    if (!limitStr) {
        return NextResponse.json({ error: "Bad Request - Missing limit..." }, { status: 400 });
    }

    if (!offsetStr) {
        return NextResponse.json({ error: "Bad Request - Missing offset..." }, { status: 400 });
    }

    // Convert to numbers if needed
    const limit = parseInt(limitStr);
    const offset = parseInt(offsetStr);

    if (isNaN(limit)) {
        return NextResponse.json({ error: "Bad Request - Limit must be an integer..." }, { status: 400 });
    }

    if (isNaN(offset)) {
        return NextResponse.json({ error: "Bad Request - Offset must be an integer..." }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
        throw new Error("Missing backend url...");
    }

    const backendQuery = new URL(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/books/completed");
    const params = new URLSearchParams();
    params.set("limit", limit.toString());
    params.set("offset", offset.toString());

    backendQuery.search = params.toString();

    const backendRes = await fetch(backendQuery);
    const backendResJson = await backendRes.json();

    console.log("From backend: ");
    console.dir(backendResJson);

    return NextResponse.json(backendResJson);
};
