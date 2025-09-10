import { useState } from "react"


export type BookSearchForm = {
    title?: string,
    author?: string,
}

export type BookCreateForm = Required<BookSearchForm> & {
    cover_id: number | null,
    selected_by: number, // my user id
}


export default function CreateBook() {
    const [searchForm, setSearchForm] = useState<BookSearchForm>({
        title: "",
        author: "",
    });

    const [isSearching, setIsSearching] = useState(false);

}