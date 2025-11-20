"use client";

import useFetchClubHistory from "@/lib/hook/useFetchClubHistory";
import { BookEntryScrollView } from "./BookEntryScrollView";

export function CompletedBookScrollView() {
    return <BookEntryScrollView fetchHook={useFetchClubHistory} />;
}