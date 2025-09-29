import useFetchCompletedBooks from "@/lib/hook/useFetchCompletedBooks";
import { BookScrollView } from "./BookScrollView";

export function CompletedBookScrollView() {
    return <BookScrollView fetchHook={useFetchCompletedBooks} />;
}