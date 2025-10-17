import { ReadingListService } from "@/client_service/ReadingListServiceImpl";

export const useReadingListService = () => {
    const service = new ReadingListService();
    return service;
};