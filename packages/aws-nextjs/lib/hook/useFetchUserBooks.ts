import useFetchBooks from "@/hook/useFetchBooks";
import { useReadingListService } from "@/hook/useReadingListService";

export default function useFetchUserBooks(userId: number) {
    const service = useReadingListService(); // get the service from context

    return useFetchBooks({
        fetchBooks: (limit, offset) => service.getReadingList(userId, limit, offset),
    });
}
