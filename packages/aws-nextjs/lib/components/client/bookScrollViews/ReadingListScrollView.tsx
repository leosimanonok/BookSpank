"use client";
import { useUser } from "@/lib/context/UserContext";
import { BookEntryScrollView } from "./BookEntryScrollView";
import useFetchReadingListEntries from "@/lib/hook/useFetchReadingListEntriesBooks";


export function ReadingListScrollView() {
    return <BookEntryScrollView fetchHook={() => useFetchReadingListEntries()} />;
}