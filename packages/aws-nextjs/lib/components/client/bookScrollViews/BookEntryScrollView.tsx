"use client";

import { Card } from "@/client_components/base/Card";
import { BookEntryCard } from "@/lib/components/client/BookEntryCard";

import { useEffect, useRef } from "react";
import { IBookEntry } from "@/model/BookEntry";


interface BookScrollViewProps {
    fetchHook: () => {
        entries: IBookEntry[];
        loading: boolean;
        hasMoreEntries: boolean;
        loadMoreEntries: () => void;
    };
}

export function BookEntryScrollView({ fetchHook }: BookScrollViewProps) {

    const { entries, loading, hasMoreEntries, loadMoreEntries } = fetchHook();

    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Infinite scroll observer
    useEffect(() => {
        if (!scrollRef.current || !hasMoreEntries) return;

        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting) {
                    loadMoreEntries();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(scrollRef.current);

        return () => {
            if (scrollRef.current) observer.unobserve(scrollRef.current);
        };
    }, [loading, hasMoreEntries, loadMoreEntries]);


    if (!entries.length) {
        return (
            <div className="flex justify-center">
                <p >{loading ? "Loading books..." : "No books found..."}</p>
            </div>
        )
    }

    return (
        <Card className="w-2/3 mx-auto">
            {entries.map((b) => (
                <BookEntryCard entry={b} />
            ))}

            {/* Scroll div at the bottom */}
            {hasMoreEntries && <div ref={scrollRef} className="h-8" />}

            {loading && <p className="mt-2 text-sm text-black text-center">Loading more books...</p>}
        </Card>
    )
}