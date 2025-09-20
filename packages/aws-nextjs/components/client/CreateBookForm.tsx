import { useState } from "react"
import { Card } from "./base/Card";
import { Label } from "./base/Label";
import { Input } from "./base/Input";
import { Button } from "./base/Button";
import { OpenLibrarySearchResponse } from "@/lib/dto/OpenLibrarySearchResponse";


export type BookSearchForm = {
    title: string,
    author: string,
}

export type BookCreateForm = BookSearchForm & {
    cover_id: number | null,
    selected_by: number, // my user id
}



export default function CreateBookForm() {
    const [searchForm, setSearchForm] = useState<BookSearchForm>({
        title: "",
        author: "",
    });

    const LIMIT = 10;
    const [offset, setOffset] = useState(0);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [booksRemaining, setBooksRemaining] = useState(true);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setSearchForm((prev) => ({ ...prev, [name]: value }));
    };


    const search = async () => {
        if (searching) return;

        if (!searchForm.author && !searchForm.title) {
            alert("Either author or title is required...");
        }

        setSearching(true);

        try {
            const params = new URLSearchParams();

            if (searchForm.author) {
                params.append("author", searchForm.author);
            }
            if (searchForm.title) {
                params.append("title", searchForm.title);
            }

            params.append("limit", LIMIT.toString());
            params.append("offset", offset.toString());

            const url = new URL("/api/openlibrary");

            url.search = params.toString();

            const res = await fetch(url);

            if (!res.ok) {
                const { error } = await res.json();
                setError(true);
                setErrorMsg(error);
                return;
            }

            const books: OpenLibrarySearchResponse[] = await res.json();
        }
        finally {
            setSearching(false);
        }
    }



    return (
        <div className="min-h-screen bg-background">
            <div className="text-center">
                <h3> Add a Book </h3>
            </div>
            <Card>
                <div className="flex gap-4 mb-6">
                    <Label>
                        Search
                    </Label>
                    <div className="flex gap-2">
                        <Label > Title: </Label>
                        <Input
                            id="title"
                            name="title"
                            value={searchForm.title}
                            onChange={handleChange}
                        > </Input>
                    </div>
                    <div className="flex gap-2">
                        <Label > Author: </Label>
                        <Input
                            id="author"
                            name="author"
                            value={searchForm.author}
                            onChange={handleChange}
                        > </Input>
                    </div>
                    <Button
                        disabled={searching}>
                        {searching ? "Searching..." : "Search"}

                    </Button>
                </div>
            </Card>
        </div>
    )

}