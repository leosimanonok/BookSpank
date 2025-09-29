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

    return (
        <Card>
            <h1> Search for a Book</h1>
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
            {
                books.length
                    ? (
                        <Card className="w-2/3 mx-auto">
                            {books.map((b) => (
                                <OpenLibBookCard key={b.title} book={b} />
                            ))}

                            {/* Scroll div at the bottom */}
                            {hasMoreBooks && <div ref={scrollRef} className="h-8" />}

                            {loading && <p className="mt-2 text-sm text-black text-center">Loading more books...</p>}
                        </Card>
                    )
                    : (
                        <Card>
                            {loading ?
                                <p>Loading books...</p>
                                :
                                <p>No books found...</p>
                            }
                        </Card>
                    )
            }

        </Card>
    )
}