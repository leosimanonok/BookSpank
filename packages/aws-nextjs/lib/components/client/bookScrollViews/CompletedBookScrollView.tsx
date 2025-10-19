"use client";

import useFetchClubHistory from "@/lib/hook/useFetchClubHistory";
import { BookScrollView } from "./BookScrollView";

export function CompletedBookScrollView() {
    return <BookScrollView fetchHook={useFetchClubHistory} />;
}