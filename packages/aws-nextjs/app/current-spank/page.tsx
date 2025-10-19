"use client";

import { useClubHistoryService } from "@/lib/hook/useClubHistoryService";
import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";
import { useEffect, useState } from "react";

export default function CurrentSpank() {
    const [currentBook, setCurrentBook] = useState<ClubHistoryEntry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const clubHistoryService = useClubHistoryService();

    useEffect(() => {

        const fetchCurrentBook = async () => {
            try {
                setLoading(true);
                const book = await clubHistoryService.getCurrent();
                setCurrentBook(book);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch current book");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentBook();

        return () => { };
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Current Spank</h3>
                </div>

                {loading && (
                    <div className="text-gray-600">Loading current book...</div>
                )}

                {error && (
                    <div className="text-red-600 mb-4">Error: {error}</div>
                )}

                {!loading && !error && currentBook && (
                    <div className="text-center">
                        <h4 className="text-lg font-medium mb-2">{currentBook.book.title}</h4>
                        <p className="text-gray-700">by {currentBook.book.author}</p>
                        {currentBook.started && (
                            <p className="text-sm text-gray-500 mt-2">
                                Started: {currentBook.started.toLocaleDateString()}
                            </p>
                        )}
                    </div>
                )}

                {!loading && !error && !currentBook && (
                    <div className="text-gray-600">No book is currently being read.</div>
                )}
            </div>
        </>
    );
}
