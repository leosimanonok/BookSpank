import { useEffect, useState } from "react";
import { Book } from "../model/Book";
import { useBookService } from "@/hook/useBookService";


export default function useFetchCompletedBooks() {

    const bookService = useBookService(); // get the service from context


    const PAGE_SIZE = 20;
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMoreBooks, setHasMoreBooks] = useState(true);

    const loadBooks = async () => {
        if (!hasMoreBooks) return;
        setLoading(true);

        try {
            const moreBooks = await bookService.getCompleted(PAGE_SIZE, books.length);

            if (moreBooks.length < PAGE_SIZE) {
                setHasMoreBooks(false);
            }
            setBooks((prev) => [...prev, ...moreBooks]);
        }
        finally {
            setLoading(false);
        }
    }

    // Pull initial books
    useEffect(() => {
        loadBooks();
    }, []);

    return {
        books,
        loading,
        hasMoreBooks,
        loadMoreBooks: loadBooks
    };

}