"use client";

import { useUser } from "@/context/UserContext";
import { useClubHistoryService } from "@/hook/useClubHistoryService";
import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";
import { useEffect, useState } from "react";
import { Button } from "@/client_components/base/Button";

// TODO: update this to always display the latest book, even if it is 'finished', so that we have something here until we start the next book
export function CurrentSpankView() {
    const [currentEntry, setCurrentEntry] = useState<ClubHistoryEntry | null>(null);
    const [loadingEntry, setLoadingEntry] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const clubHistoryService = useClubHistoryService();
    const { user } = useUser();

    const [updating, setUpdating] = useState(false);

    const onButtonClick = async () => {
        if (currentEntry === null || currentEntry.finished) return;
        try {
            setUpdating(true);
            const updatedEntry = await clubHistoryService.completeBook(user.id, currentEntry.book.id);
            setCurrentEntry(updatedEntry);
        }
        catch (err) {
            console.error(err);
            alert("Unable to set finish book...");
        }
        finally {
            setUpdating(false);
        }

    }

    useEffect(() => {

        const fetchCurrentBook = async () => {
            try {
                setLoadingEntry(true);
                const book = await clubHistoryService.getCurrent();
                setCurrentEntry(book);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch current book");
            } finally {
                setLoadingEntry(false);
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

                {loadingEntry && (
                    <div className="text-gray-600">Loading current book...</div>
                )}

                {error && (
                    <div className="text-red-600 mb-4">Error: {error}</div>
                )}

                {!loadingEntry && !error && currentEntry && (
                    <div className="text-center">
                        <h4 className="text-lg font-medium mb-2">{currentEntry.book.title}</h4>
                        <p className="text-gray-700">by {currentEntry.book.author}</p>
                        {currentEntry.started && (
                            <p className="text-sm text-gray-500 mt-2">
                                Started: {currentEntry.started.toLocaleDateString()}
                            </p>
                        )}
                    </div>
                )}

                {user && (
                    <Button
                        disabled={currentEntry?.finished !== null}
                        onClick={onButtonClick}
                    >
                        {updating ? "Completing spank..." : "Finish book"}
                    </Button>
                )}

                {!loadingEntry && !error && !currentEntry && (
                    <div className="text-gray-600">No book is currently being read.</div>
                )}
            </div>
        </>
    );

}