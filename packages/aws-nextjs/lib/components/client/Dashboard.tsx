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
        <div>
            <h1>{username}'s Dashboard</h1>
            <div>
                <Button
                    onClick={(e) => setTab("view")}
                    disabled={tab === "view"}>
                    View My Books
                </Button>
                <Button
                    onClick={(e) => setTab("search")}
                    disabled={tab === "search"}>
                    Search for Books
                </Button>
            </div>

            {tab === "search" && (
                <OpenLibBookScrollView />
            )}

            {tab === "view" && (
                <UserBookScrollView userId={userId} />
            )}
        </div>
    )

}