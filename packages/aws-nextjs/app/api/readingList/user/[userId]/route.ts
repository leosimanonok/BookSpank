import { auth } from "@/app/actions";
import { isOpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";
import { ReadingListService } from "@/server_service/ReadingListServiceImpl";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    userId: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
    const subject = await auth();

    if (!subject) {
        return NextResponse.json({ error: "Unauthorized - please login..." }, { status: 401 });
    }

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

    const backendService = new ReadingListService();
    const backendRes = await backendService.getReadingList(parseInt(userId), limit, offset);

    if (!backendRes.ok) {
        console.error(`${backendRes.status} - ${backendRes.statusText}`);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    const backendResJson = await backendRes.json();

    return NextResponse.json(backendResJson);

};

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {

    const subject = await auth();

    if (!subject) {
        return NextResponse.json({ error: "Unauthorized - please login..." }, { status: 401 });
    }

    const [{ userId }, body] = await Promise.all([params, req.json()]);

    if (!userId) {
        return NextResponse.json({ error: "Bad Request - Missing userId..." }, { status: 400 });
    }

    if (!isOpenLibrarySearchResponse(body)) {
        return NextResponse.json({ error: "Bad Request - Body is invalid..." }, { status: 400 });
    }

    const backendService = new ReadingListService();
    const backendRes = await backendService.addBook(parseInt(userId), body);

    if (!backendRes.ok) {
        if (backendRes.status === 409) {
            return NextResponse.json({ message: "Ok - Book was already in db..." }, { status: 200 });
        }
        console.error(backendRes.statusText);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Created - Book added to reading list..." }, { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
    const subject = await auth();

    if (!subject) {
        return NextResponse.json({ error: "Unauthorized - please login..." }, { status: 401 });
    }

    const [{ userId }, body] = await Promise.all([params, req.json()]);

    if (!userId) {
        return NextResponse.json({ error: "Bad Request - Missing userId..." }, { status: 400 });
    }

    if (!body.bookId) {
        return NextResponse.json({ error: "Bad Request - Missing bookId..." }, { status: 400 });
    }


    const backendService = new ReadingListService();
    const backendRes = await backendService.removeBook(parseInt(userId), parseInt(body.bookId));

    if (!backendRes.ok) {
        if (backendRes.status === 404) {
            return NextResponse.json({ message: "Not Found - Book not found..." }, { status: 200 });
        }
        console.error(backendRes.statusText);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Ok - Book removed from reading list..." }, { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
    const subject = await auth();

    if (!subject) {
        return NextResponse.json({ error: "Unauthorized - please login..." }, { status: 401 });
    }

    const [{ userId }, body] = await Promise.all([params, req.json()]);

    if (!userId) {
        return NextResponse.json({ error: "Bad Request - Missing userId..." }, { status: 400 });
    }

    if (!body.bookId) {
        return NextResponse.json({ error: "Bad Request - Missing bookId..." }, { status: 400 });
    }

    if (!body.wantToReadNext) {
        return NextResponse.json({ error: "Bad Request - Missing wantToReadNext..." }, { status: 400 });
    }

    // TODO: Might need more parsing here...
    if (typeof body.wantToReadNext !== "boolean") {
        return NextResponse.json({ error: "Bad Request - wantToReadNext should be a boolean..." }, { status: 400 });

    }

    const backendService = new ReadingListService();
    const backendRes = await backendService.updateWantToReadNext(parseInt(userId), parseInt(body.bookId), body.wantToReadNext);

    if (!backendRes.ok) {
        if (backendRes.status === 404) {
            return NextResponse.json({ message: "Not Found - Book not found..." }, { status: 200 });
        }
        console.error(backendRes.statusText);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Ok - Book position updated..." }, { status: 200 });
}