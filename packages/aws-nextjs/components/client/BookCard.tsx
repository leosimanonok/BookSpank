import { Book } from "@/lib/model/Book";
import { Card } from "./base/Card";

type props = {
    book: Book;
}


export function BookCard(props: props) {

    return (
        <Card>
            <h3>{props.book.title}</h3>
            <p>By: {props.book.author}</p>
            <p>Started: {getDateString(props.book.started)}</p>
            <p>Finished: {getDateString(props.book.finished)}</p>
        </Card>
    )
}

function getDateString(date?: Date) {
    if (!date) return "N/A";
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2); // last 2 digits

    return `${mm}/${dd}/${yy}`;
}