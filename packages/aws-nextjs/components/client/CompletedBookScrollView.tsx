"use client";

import { Card } from "./base/Card";
import useFetchCompletedBooks from "@/lib/hook/useFetchCompletedBooks";
import { BookCard } from "./BookCard";
import { useEffect, useRef } from "react";


export function CompletedBookScrollView() {

    const { books, loading, hasMoreBooks, loadMoreBooks } = useFetchCompletedBooks();

    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Infinite scroll observer
    useEffect(() => {
        if (!scrollRef.current || !hasMoreBooks) return;

        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting) {
                    loadMoreBooks();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(scrollRef.current);

        return () => {
            if (scrollRef.current) observer.unobserve(scrollRef.current);
        };
    }, [loading, hasMoreBooks, loadMoreBooks]);


    if (!books.length) {
        return (
            <>
                <Card>
                    {loading ?
                        <p>Loading books...</p>
                        :
                        <p>No books found...</p>
                    }
                </Card>
            </>
        )
    }

    return (
        <Card className="w-2/3 mx-auto">
            {books.map((b) => (
                <BookCard key={b.id} book={b} />
            ))}

            {/* Scroll div at the bottom */}
            <div ref={scrollRef} className="h-8" />

            {loading && <p className="mt-2 text-sm text-gray-500">Loading books...</p>}
        </Card>
    )
}