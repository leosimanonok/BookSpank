import { useBackendService } from "@/hook/useBackendService";

export const useReadingListService = () => {
    const service = useBackendService();

    return service.ReadingList;
};