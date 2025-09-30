import { BackendService } from "@/lib/service/impl/BackendServiceImpl";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    userId: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {

    const { userId } = await params;
    const searchParams = req.nextUrl.searchParams;

    const limitStr = searchParams.get("limit");
    const offsetStr = searchParams.get("offset");

    if (!limitStr) {
        return NextResponse.json({ error: "Bad Request - Missing limit..." }, { status: 400 });
    }

    if (!offsetStr) {
        return NextResponse.json({ error: "Bad Request - Missing offset..." }, { status: 400 });
    }

    if (!userId) {
        return NextResponse.json({ error: "Bad Request - Missing userId..." }, { status: 400 });
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

    const backendService = new BackendService();
    const backendRes = await backendService.getUserBooks(parseInt(userId), limit, offset);

    if (!backendRes.ok) {
        console.error(`${backendRes.status} - ${backendRes.statusText}`);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    const backendResJson = await backendRes.json();

    console.log("From backend: ");
    console.dir(backendResJson);

    return NextResponse.json(backendResJson);

};

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {

}