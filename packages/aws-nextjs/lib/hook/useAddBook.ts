import { useState } from "react";
import { OpenLibrarySearchResponse } from "../dto/OpenLibrarySearchResponse";
import { useBookService } from "./useBookService";

type AddBookProps = {
    userId: number;
}

export default function useAddBook({ userId }: AddBookProps) {
    const bookService = useBookService();

    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const addBook = async (book: OpenLibrarySearchResponse) => {
        setLoading(true);
        try {
            const res = await bookService.addBook(userId, book);
            setAdded(true);
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("Unknown error occurred...");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return {
        added,
        error,
        loading,
        addBook
    }
}