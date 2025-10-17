import { NextResponse } from "next/server";

export async function GET() {
    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
        throw new Error("Missing backend url...");
    }

    const backendQuery = new URL(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/books/current");

    try {
        const backendRes = await fetch(backendQuery);

        if (!backendRes.ok) {
            return NextResponse.json({ error: "Failed to fetch current book" }, { status: backendRes.status });
        }

        const backendResJson = await backendRes.json();

        console.log("Current book from backend: ");
        console.dir(backendResJson);

        return NextResponse.json(backendResJson);
    } catch (error) {
        console.error("Error fetching current book:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}