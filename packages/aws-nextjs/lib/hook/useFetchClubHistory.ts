import useFetchBooks from "./useFetchBooks";
import { useClubHistoryService } from "./useClubHistoryService";

export default function useFetchClubHistory() {
    const service = useClubHistoryService(); // get the service from context

    return useFetchBooks({
        fetchBooks: (limit, offset) => service.getClubHistory(limit, offset),
    });
}
