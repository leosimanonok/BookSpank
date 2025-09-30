"use client";

import { Card } from "../base/Card";
import { BookCard } from "../BookCard";
import { useEffect, useRef } from "react";
import { Book } from "@/model/Book"


interface BookScrollViewProps {
    fetchHook: () => {
        books: Book[];
        loading: boolean;
        hasMoreBooks: boolean;
        loadMoreBooks: () => void;
    };
}

export function BookScrollView({ fetchHook }: BookScrollViewProps) {

    const { books, loading, hasMoreBooks, loadMoreBooks } = fetchHook();

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
            <div className="flex justify-center">
                <p >{loading ? "Loading books..." : "No books found..."}</p>
            </div>
        )
    }

    return (
        <Card className="w-2/3 mx-auto">
            {books.map((b) => (
                <BookCard key={b.id} book={b} />
            ))}

            {/* Scroll div at the bottom */}
            {hasMoreBooks && <div ref={scrollRef} className="h-8" />}

            {loading && <p className="mt-2 text-sm text-black text-center">Loading more books...</p>}
        </Card>
    )
}