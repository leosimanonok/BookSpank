"use client";
import { useUser } from "@/lib/context/UserContext";
import { BookEntryScrollView } from "./BookScrollView";
import useFetchUserBooks from "@/lib/hook/useFetchUserBooks";



export function UserBookScrollView() {
    const { user } = useUser();
    return <BookEntryScrollView fetchHook={() => useFetchUserBooks(user.id)} />;
}