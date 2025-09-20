"use client";

import { Book } from "@/lib/model/Book";
import { useState } from "react";
import { Card } from "./base/Card";
import useFetchCompletedBooks from "@/hooks/useFetchCompletedBooks";


export function BookScrollView(
    {
        title,
        fetchUrl,
    }:
        {
            title: string
            fetchUrl: string,
        }
) {

    const { books, loading, hasMoreBooks, loadMoreBooks } = useFetchCompletedBooks(bookService);



    if (!books.length) {
        return (
            <>
                <Card>
                    <h2>{title}</h2>
                    {loading} ?
                    <p>Loading books...</p>
                    :
                    <p>No books found...</p>
                </Card>
            </>
        )
    }

    return (
        <>
        </>
    )
}