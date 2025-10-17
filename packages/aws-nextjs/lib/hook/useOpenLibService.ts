import { OpenLibraryService } from "@/lib/service/client/impl/OpenLibraryServiceImpl";

export const useOpenLibService = () => {
    return new OpenLibraryService();
};