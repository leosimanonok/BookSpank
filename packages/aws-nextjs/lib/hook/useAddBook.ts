import { useState } from "react";
import { OpenLibrarySearchResponse } from "../dto/OpenLibrarySearchResponse";
import { useUser } from "../context/UserContext";
import { useReadingListService } from "./useReadingListService";


export default function useAddBook() {

    const readingListService = useReadingListService();
    const { user } = useUser();

    const [added, setAdded] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const addBook = async (book: OpenLibrarySearchResponse) => {
        setLoading(true);
        try {
            const res = await readingListService.addBook(user.id, book);
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