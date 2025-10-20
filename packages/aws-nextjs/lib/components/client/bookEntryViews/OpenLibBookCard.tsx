import { Card } from "@/client_components/base/Card";
import { Label } from "@/client_components/base/Label";
import Image from "next/image";
import { OpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";
import { Button } from "@/client_components/base/Button";
import useAddBook from "@/lib/hook/useAddBook";

type props = {
    book: OpenLibrarySearchResponse;
}

export function OpenLibBookCard(props: props) {

    const { added, error, loading, addBook } = useAddBook();

    return (
        <Card className="bg-accent flex flex-col justify-center p-4 text-center items-center">
            <div className="mb-4">
                <h3 className="text-center">{props.book.title}</h3>
                <Label>Author: {props.book.author}</Label>
            </div>

            <Image className="mb-4" src={props.book.coverUrls?.M ?? "/file.svg"}
                alt={`${props.book.title}-img`}
                width={200}           // max width
                height={200}          // max height
                style={{ width: "auto", height: "200px" }}
            />
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