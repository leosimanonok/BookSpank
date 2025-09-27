import { BookScrollView } from "./BookScrollView";
import useFetchUserBooks from "@/lib/hook/useFetchUserBooks";

type UserBookScrollViewProps = {
    userId: number;
}

export function UserBookScrollView({ userId }: UserBookScrollViewProps) {
    return <BookScrollView fetchHook={() => useFetchUserBooks(userId)} />;
}