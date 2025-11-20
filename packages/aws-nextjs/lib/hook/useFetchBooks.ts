"use client";

import { useEffect, useState } from "react";
import { Book } from "@/model/Book"
import { IBookEntry } from "../model/BookEntry";


interface FetchBooksProps {
    fetchEntries(limit: number, offset: number): Promise<{ book: Book }[]>;
}

export default function useFetchEntries({ fetchEntries }: FetchBooksProps) {

    const PAGE_SIZE = 20;
    const [entries, setEntries] = useState<IBookEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMoreEntries, setHasMoreEntries] = useState(true);

    const loadMoreEntries = async () => {
        if (!hasMoreEntries || loading) return;
        setLoading(true);

        try {
            const moreBooks = await fetchEntries(PAGE_SIZE, entries.length);

            if (moreBooks.length < PAGE_SIZE) {
                setHasMoreEntries(false);
            }
            setEntries((prev) => [...prev, ...moreBooks]);
        }
        finally {
            setLoading(false);
        }
    }

    // Pull initial books
    useEffect(() => {
        loadMoreEntries();
    }, []);

    return {
        entries,
        loading,
        hasMoreEntries,
        loadMoreEntries
    };

}