"use client";

import { useEffect, useRef } from "react";
import { Card } from "../base/Card";
import { OpenLibBookCard } from "../OpenLibBookCard";
import useFetchOpenLibBooks from "@/lib/hook/useFetchOpenLibBooks";
import { Label } from "../base/Label";
import { Input } from "../base/Input";

export function OpenLibBookScrollView() {

    const {
        title,
        setTitle,
        author,
        setAuthor,
        books,
        loading,
        hasMoreBooks,
        loadMoreBooks
    } = useFetchOpenLibBooks();

    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Infinite scroll observer
    useEffect(() => {
        if (!scrollRef.current || !hasMoreBooks || loading) return;

        console.log(`In scroll effect`);

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

    return (
        <Card className="bg-red p-5">
            <h1 className="text-2xl"> Search for a Book</h1>
            <Label>Title:</Label>
            <Input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Label>Author:</Label>
            <Input
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            {/* if books avail, show */}

            {books.length > 0 && (
                <Card className="w-2/3 mx-auto">
                    {books.map((b) => (
                        <OpenLibBookCard key={b.id} book={b} />
                    ))}

                    {/* Scroll div at the bottom */}
                    <div ref={scrollRef} className="h-px w-full invisible" />

                    {loading && <p className="mt-2 text-sm text-black text-center">Loading more books...</p>}
                    {!hasMoreBooks && !loading && <p className="mt-2 text-sm text-black text-center">No more matching books...</p>}
                </Card>
            )}
        </Card>
    )
}