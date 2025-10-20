"use client";
import { BookEntryScrollView } from "@/client_components/bookScrollViews/BookEntryScrollView";
import useFetchReadingListEntries from "@/hook/useFetchReadingListEntriesBooks";


export function ReadingListScrollView() {
    return <BookEntryScrollView fetchHook={() => useFetchReadingListEntries()} />;
}