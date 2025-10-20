"use client";

import useFetchClubHistory from "@/hook/useFetchClubHistory";
import { BookEntryScrollView } from "@/client_components/bookScrollViews/BookEntryScrollView";

export function ClubHistoryScrollView() {
    return <BookEntryScrollView fetchHook={useFetchClubHistory} />;
}