import { useEffect, useState } from "react";
import { Book } from "../model/Book";
import { IBookService } from "../service/BookService";


export default function useFetchCompletedBooks(bookSerice: IBookService) {

    const PAGE_SIZE = 20;
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMoreBooks, setHasMoreBooks] = useState(true);

    const loadBooks = async () => {
        if (!hasMoreBooks) return;
        setLoading(true);

        try {
            const moreBooks = await bookSerice.getCompleted(PAGE_SIZE, books.length);

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