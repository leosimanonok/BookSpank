import useFetchEntries from "@/hook/useFetchBooks";
import { useReadingListService } from "@/hook/useReadingListService";

export default function useFetchUserBooks(userId: number) {
    const service = useReadingListService(); // get the service from context

    return useFetchEntries({
        fetchEntries: (limit, offset) => service.getReadingList(userId, limit, offset),
    });
}
