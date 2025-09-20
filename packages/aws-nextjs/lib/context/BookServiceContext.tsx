import React, { createContext, useContext } from "react";
import { IBookService } from "@/service/BookService";
import { BookService } from "@/service/BookServiceImpl";

export const BookServiceContext = createContext<IBookService | null>(null);

type BookServiceProviderProps = {
    children: React.ReactNode,
    service: IBookService,
};

export const BookServiceProvider = ({ children, service }: BookServiceProviderProps) => {
    const bookService = new BookService();

    return <BookServiceContext value={bookService}>{children}</BookServiceContext>
};