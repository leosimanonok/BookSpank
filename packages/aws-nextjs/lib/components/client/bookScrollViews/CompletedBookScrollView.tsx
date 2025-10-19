"use client";

import useFetchClubHistory from "@/lib/hook/useFetchClubHistory";
import { BookEntryScrollView } from "./BookScrollView";

export function CompletedBookScrollView() {
    return <BookEntryScrollView fetchHook={useFetchClubHistory} />;
}