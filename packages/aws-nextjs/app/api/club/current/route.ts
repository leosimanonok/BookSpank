import { NextRequest, NextResponse } from "next/server";
import { ClubHistoryService } from "@/server_service/ClubHistoryServiceImpl";
import { auth } from "@/app/actions";

export async function GET() {

    const service = new ClubHistoryService();
    const res = await service.getCurrent();

    console.log(`Status: ${res.status} - ${res.statusText}`);

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

export async function PATCH(req: NextRequest) {
    const user = await auth();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized - Login before accessing this endpoint..." }, { status: 403 });
    }

    const { userId, bookId } = await req.json();

    if (!userId) {
        return NextResponse.json({ error: "Bad Request - Missing userId..." }, { status: 400 });
    }

    if (!bookId) {
        return NextResponse.json({ error: "Bad Request - Missing bookId..." }, { status: 400 });
    }

    const service = new ClubHistoryService();
    const res = await service.completeBook(bookId);

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