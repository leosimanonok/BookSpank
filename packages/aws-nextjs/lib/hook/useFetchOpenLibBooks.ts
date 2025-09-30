import { useCallback, useEffect, useRef, useState } from "react";
import { OpenLibrarySearchResponse } from "@/dto/OpenLibrarySearchResponse";
import { useOpenLibService } from "./useOpenLibService";


export default function useFetchOpenLibBooks() {

    const PAGE_SIZE = 5;
    const [books, setBooks] = useState<OpenLibrarySearchResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMoreBooks, setHasMoreBooks] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    const abortRef = useRef<AbortController | null>(null); // used to cancel fetch if title or author is updated while fetching
    const debounceRef = useRef<NodeJS.Timeout | null>(null); // used to debounc / wait 300ms after last update to title or author to send fetch

    const bookService = useOpenLibService(); // get the service from context

    const loadBooks = useCallback(async (reset: boolean = false) => {
        if (!hasMoreBooks || (!title && !author)) return;

        // cancel any in-progress request
        if (abortRef.current) {
            abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        try {
            const offset = books.length; // get current books length
            const input = { title, author, limit: PAGE_SIZE, offset };

            console.log("searching with: ");
            console.dir(input);

            const moreBooks = await bookService.search(input, { signal: controller.signal });

            if (reset) {
                setBooks(moreBooks);
            }
            else if (moreBooks.length) {
                console.log(`Adding ${moreBooks.length} books...`)
                setBooks((prev) => [...prev, ...moreBooks]);
            }

            if (moreBooks.length < PAGE_SIZE) {
                console.log("No more books...")
                setHasMoreBooks(false);
            }

            console.log(`Total books: ${books.length + moreBooks.length}`);
        }
        catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
                console.log("Fetch aborted...");
            }
            else {
                throw err;
            }
        }
        finally {
            setLoading(false);
        }
    }, [hasMoreBooks, loading, bookService]);

    // clear results on update to title or author
    useEffect(() => {
        // update timer
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (abortRef.current) {
            console.log("Aborting fetch...");
            abortRef.current.abort();
        }
        setBooks((prev) => (prev.length ? [] : prev)); // stops infinite loop of re-rendering
        setHasMoreBooks((prev) => prev ? prev : true); // dont want to reset to true if already true

        if (title || author) {
            debounceRef.current = setTimeout(() => {
                loadBooks(true); // fetch fresh with reset
            }, 300); // 👈 debounce delay
        }
    }, [title, author]);

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
