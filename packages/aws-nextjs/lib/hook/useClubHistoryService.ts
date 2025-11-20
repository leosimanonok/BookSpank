import { ClubHistoryService } from "@/client_service/ClubHistoryServiceImpl";

export const useClubHistoryService = () => {
    return new ClubHistoryService();
}