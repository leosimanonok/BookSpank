import { useState } from "react";
import { OpenLibrarySearchResponse } from "../dto/OpenLibrarySearchResponse";
import { useBookService } from "./useBookService";
import { useUser } from "../context/UserContext";


export default function useAddBook() {
    const bookService = useBookService();
    const { user } = useUser();

    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const addBook = async (book: OpenLibrarySearchResponse) => {
        setLoading(true);
        try {
            const res = await bookService.addBook(user.id, book);
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