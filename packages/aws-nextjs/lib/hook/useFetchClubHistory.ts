import useFetchEntries from "./useFetchBooks";
import { useClubHistoryService } from "./useClubHistoryService";

export default function useFetchClubHistory() {
    const service = useClubHistoryService(); // get the service from context

    return useFetchEntries({
        fetchEntries: (limit, offset) => service.getClubHistory(limit, offset),
    });
}
