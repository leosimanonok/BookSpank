import { Book } from "@/lib/model/Book";
import { Card } from "./base/Card";
import { Label } from "./base/Label";

type props = {
    book: Book;
}


export function BookCard(props: props) {

    console.dir(props.book);

    return (
        <Card className="bg-accent flex flex-col">
            <h3>{props.book.title}</h3>
            <Label>By: {props.book.author}</Label>
            <Label>Started: {getDateString(props.book.started)}</Label>
            <Label>Finished: {getDateString(props.book.finished)}</Label>
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