import { NextRequest, NextResponse } from "next/server";
import { ClubHistoryService } from "@/server_service/ClubHistoryServiceImpl";

export async function GET() {

    const service = new ClubHistoryService();
    const res = await service.getCurrent();

    if (!res.ok && res.status === 404) {
        return NextResponse.json({ error: "Not Found - Unable to find current spank..." }, { status: 404 });
    }
    else if (!res.ok) {
        console.error(`Status: ${res.status} - ${res.statusText}`);
        return NextResponse.json({ error: "Internal Server Error - Unable to complete your request..." }, { status: 500 });

    }

    const data = await res.json();

    return NextResponse.json(data, {
        status: 200,
        statusText: "Ok"
    });
}