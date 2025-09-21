import { BookService } from "@/service/BookServiceImpl";

export const useBookService = () => {
    return new BookService()
};