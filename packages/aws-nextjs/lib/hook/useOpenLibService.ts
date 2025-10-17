import { OpenLibraryService } from "@/service/OpenLibraryServiceImpl";

export const useOpenLibService = () => {
    return new OpenLibraryService();
};