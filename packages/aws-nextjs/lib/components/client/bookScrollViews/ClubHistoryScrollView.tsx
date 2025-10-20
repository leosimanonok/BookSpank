"use client";

import useFetchClubHistory from "@/hook/useFetchClubHistory";
import { BookEntryScrollView } from "@/client_components/bookScrollViews/BookEntryScrollView";

export function CompletedBookScrollView() {
    return <BookEntryScrollView fetchHook={useFetchClubHistory} />;
}