import { auth } from "@/app/actions";
import { OpenLibraryService } from "@/lib/service/OpenLibraryService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const subject = await auth();

    if (!subject) {
        return NextResponse.json(
            { error: "Login before attempting to access this endpoint..." },
            { status: 401, statusText: "Unauthorized" }
        );
    }

    const params = req.nextUrl.searchParams;

    const title = params.get("title");
    const author = params.get("author");
    const limitStr = params.get("limit");
    const offsetStr = params.get("offset");

    if (!title && !author) {
        return NextResponse.json(
            { error: "Endpoint requires title or author..." },
            { status: 400, statusText: "Bad Request" }
        );
    }

    const limit = limitStr ? parseInt(limitStr, 10) : NaN;
    const offset = offsetStr ? parseInt(offsetStr, 10) : NaN;

    if (isNaN(limit)) {
        return NextResponse.json(
            { error: "Endpoint requires valid integer limit..." },
            { status: 400, statusText: "Bad Request" }
        );
    }


    if (isNaN(offset)) {
        return NextResponse.json(
            { error: "Endpoint requires valid integer offset..." },
            { status: 400, statusText: "Bad Request" }
        );
    }

    const searchRes = await OpenLibraryService.search({
        title,
        author,
        limit,
        offset
    });

    return NextResponse.json(searchRes, { status: 200, statusText: "Ok" });
}