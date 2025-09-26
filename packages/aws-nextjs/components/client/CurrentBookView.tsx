"use client";

import { Book } from "@/lib/model/Book";
import { BookService } from "@/lib/service/impl/BookServiceImpl";
import { useEffect, useState } from "react";
import { Card } from "./base/Card";
import { Label } from "./base/Label";

export function CurrentBookView() {
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentBook = async () => {
            try {
                const bookService = new BookService();
                const book = await bookService.getCurrentBook();
                setCurrentBook(book);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch current book");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentBook();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <p>Loading current book...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center p-8">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (!currentBook) {
        return (
            <div className="flex justify-center items-center p-8">
                <p>No book is currently being read.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <Card className="bg-accent flex flex-col max-w-md">
                <h2 className="text-2xl font-bold mb-2">{currentBook.title}</h2>
                <Label className="text-lg mb-4">By: {currentBook.author}</Label>
                <Label>Started: {getDateString(currentBook.started)}</Label>
            </Card>
        </div>
    );
}

function getDateString(date?: Date) {
    if (!date) return "N/A";

    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);

    return `${mm}/${dd}/${yy}`;
}