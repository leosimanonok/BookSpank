import { useBackendService } from "./useBackendService";

export const useClubHistoryService = () => {
    const service = useBackendService();

    return service.ClubHistory;
};