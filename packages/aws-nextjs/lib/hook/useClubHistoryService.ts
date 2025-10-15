import { ClubHistoryService } from "@/service/ClubHistoryServiceImpl";

export const useClubHistoryService = () => {
    return new ClubHistoryService();
};