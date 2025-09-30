import { Card } from "./base/Card";
import { Label } from "./base/Label";
import Image from "next/image";
import { OpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";
import { Button } from "./base/Button";
import useAddBook from "@/lib/hook/useAddBook";

type props = {
    book: OpenLibrarySearchResponse;
}

export function OpenLibBookCard(props: props) {

    const { added, error, loading, addBook } = useAddBook();

    return (
        <Card className="bg-accent flex flex-col">
            <h3>{props.book.title}</h3>
            <Label>Author: {props.book.author}</Label>
            <Image src={props.book.coverUrls?.M ?? "/file.svg"}
                alt={`${props.book.title}-img`}
                width={200}
                height={200} />
            <Button
                disabled={loading || added}
                onClick={() => addBook(props.book)}>
                {loading ? "Adding..." : "Add Book"}
            </Button>
            {error && (
                <p>{`Error adding book: ${error}`}</p>
            )}
        </Card>
    )
}