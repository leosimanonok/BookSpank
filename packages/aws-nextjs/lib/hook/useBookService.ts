import { IBookService } from "@/service/BookService";
import { useContext } from "react";
import { BookServiceContext } from "@/context/BookServiceContext";

export const useBookService = (): IBookService => {
    const service = useContext(BookServiceContext);
    if (!service) throw new Error("BookService not provided");
    return service;
};