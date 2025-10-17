"use client";
import { useUser } from "@/lib/context/UserContext";
import { BookScrollView } from "./BookScrollView";
import useFetchUserBooks from "@/lib/hook/useFetchUserBooks";



export function UserBookScrollView() {
    const { user } = useUser();
    return <BookScrollView fetchHook={() => useFetchUserBooks(user.id)} />;
}