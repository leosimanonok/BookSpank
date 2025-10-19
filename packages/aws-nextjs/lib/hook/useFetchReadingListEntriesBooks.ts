import useFetchEntries from "@/hook/useFetchBooks";
import { useReadingListService } from "@/hook/useReadingListService";
import { useUser } from "@/context/UserContext";

export default function useFetchReadingListEntries() {
    const service = useReadingListService(); // get the service from context
    const { user } = useUser();

    return useFetchEntries({
        fetchEntries: (limit, offset) => service.getReadingList(user.id, limit, offset),
    });
}
