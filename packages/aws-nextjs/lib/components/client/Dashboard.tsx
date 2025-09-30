"use client";

import { useState } from "react";
import { Button } from "./base/Button";
import { OpenLibBookScrollView } from "./bookScrollViews/OpenLibBookScrollView";
import { UserBookScrollView } from "./bookScrollViews/UserBookScrollView";

type DashboardProps = {
    username: string;
    userId: number;
}

export function Dashboard({ username, userId }: DashboardProps) {
    const [tab, setTab] = useState<"search" | "view">("view");

    return (
        <div className="flex flex-col items-center">
            {/* Centered, larger text */}
            <h1 className="text-4xl font-bold text-center mb-6">{username}'s Dashboard</h1>

            <div className="flex gap-4">
                <Button className="border-white border-2"
                    onClick={(e) => setTab("view")}
                    disabled={tab === "view"}>
                    View My Books
                </Button>
                <Button className="border-white border-2"
                    onClick={(e) => setTab("search")}
                    disabled={tab === "search"}>
                    Search for Books
                </Button>
            </div>

            <div className="w-2/3 mt-10">
                <div className={tab === "search" ? "block" : "hidden"}>
                    <OpenLibBookScrollView />
                </div>
                <div className={tab === "view" ? "block" : "hidden"}>
                    <UserBookScrollView userId={userId} />
                </div>
            </div>


        </div>
    )

}