import { NextRequest, NextResponse } from "next/server";
import { ClubHistoryService } from "@/server_service/ClubHistoryServiceImpl";

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

    const service = new ClubHistoryService();

    const res = await service.getClubHistory(limit, offset);

    if (!res.ok) {
        console.error(`Status: ${res.status} - ${res.statusText}`);
        return NextResponse.json({ error: "Internal Server Error - Unable to complete your request..." }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json(data, {
        status: 200,
        statusText: "Ok"
    });
};
