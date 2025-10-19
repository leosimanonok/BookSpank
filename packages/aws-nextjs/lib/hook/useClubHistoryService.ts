import { ClubHistoryService } from "../service/server/impl/ClubHistoryServiceImpl";

export const useClubHistoryService = () => {
    return new ClubHistoryService();
}