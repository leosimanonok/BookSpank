import { useBookService } from "@/hook/useBookService";
import useFetchBooks from "./useFetchBooks";

export default function useFetchUserBooks(userId: number) {
    const bookService = useBookService(); // get the service from context

    return useFetchBooks({
        fetchBooks: (limit, offset) => bookService.getUserBooks(userId, limit, offset),
    });
}
