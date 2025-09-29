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
            const offset = books.length; // get current books length
            const input = { title, author, limit: PAGE_SIZE, offset };

            const mock: OpenLibrarySearchResponse[] = [
                {
                    title: "Mock1",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock2",
                    author: "Mock2",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock3",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock4",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock5",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock6",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock7",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock8",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock9",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock10",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock11",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock12",
                    author: "Mock2",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock13",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock14",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock15",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock16",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock17",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock18",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock19",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                },
                {
                    title: "Mock20",
                    author: "Mock1",
                    coverId: null,
                    coverUrls: null,
                }
            ]

            const moreBooks = mock;// await bookService.search(input);

            if (moreBooks.length) {
                console.log("Addign books...")
                setBooks((prev) => [...prev, ...moreBooks]);
            }
            if (moreBooks.length < PAGE_SIZE) {
                console.log("No more books...")
                setHasMoreBooks(false);
            }
        } finally {
            setLoading(false);
        }
    }, [hasMoreBooks, loading, bookService]);

    // clear results on update to title or author
    useEffect(() => {
        console.log("In reset");
        setBooks((prev) => (prev.length ? [] : prev)); // stops infinite loop of re-rendering
        setHasMoreBooks((prev) => prev ? prev : true); // dont want to reset to true if already true

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
