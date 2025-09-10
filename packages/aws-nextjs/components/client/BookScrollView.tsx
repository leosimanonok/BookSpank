"use client";

import { Book } from "@/lib/model/Book";


export function BookScrollView(
    {
        initBooks,
        getMoreBooks
    }:
        {
            initBooks: Book[],
            getMoreBooks: () => Promise<Book[]>,
        }
) {
    return (
        <>
        </>
    )
}