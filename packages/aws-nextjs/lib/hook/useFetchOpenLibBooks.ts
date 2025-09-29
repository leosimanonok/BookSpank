import { useCallback, useEffect, useState } from "react";
import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";
import { useOpenLibService } from "./useOpenLibService";


export default function useFetchOpenLibBooks() {

    const PAGE_SIZE = 20;
    const [books, setBooks] = useState<OpenLibrarySearchResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMoreBooks, setHasMoreBooks] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    const bookService = useOpenLibService(); // get the service from context

    const loadBooks = useCallback(async () => {
        if (!hasMoreBooks || (!title && !author) || loading) return;

        setLoading(true);

        try {
            const input = {
                title,
                author,
                limit: PAGE_SIZE,
                offset: books.length,
            };
            const moreBooks = await bookService.search(input);

            if (moreBooks.length < PAGE_SIZE) {
                setHasMoreBooks(false);
            }
            setBooks((prev) => [...prev, ...moreBooks]);
        } finally {
            setLoading(false);
        }
    }, [title, author, hasMoreBooks, loading, books.length, bookService]);

    // clear results on update to title or author
    useEffect(() => {
        setBooks([]);
        setHasMoreBooks(true);

        if (title || author) {
            loadBooks();
        }
    }, [title, author, loadBooks]);

    return {
        books,
        title,
        setTitle,
        author,
        setAuthor,
        loading,
        hasMoreBooks,
        loadMoreBooks: loadBooks,
    };
}
