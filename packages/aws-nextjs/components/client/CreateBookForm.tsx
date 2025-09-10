import { useState } from "react"
import { Card } from "./base/Card";
import { Label } from "./base/Label";
import { Input } from "./base/Input";
import { Button } from "./base/Button";


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

    const [isSearching, setIsSearching] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setSearchForm((prev) => ({ ...prev, [name]: value }));
    };



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
                    <Button>
                        {isSearching ? "Searching..." : "Search"}
                    </Button>
                </div>
            </Card>
        </div>
    )

}