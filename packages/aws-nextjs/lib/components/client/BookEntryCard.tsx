import { Card } from "@/client_components/base/Card";
import { Label } from "@/client_components/base/Label";
import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";
import { IBookEntry, isClubHistoryEntry, isReadingListEntry } from "@/model/BookEntry";
import { ReadingListEntryCard } from "./ReadingListEntryCard";

type props = {
    entry: IBookEntry;
}

// TODO: I don't really like this setup, maybe we need to split all this up
export function BookEntryCard(props: props) {

    if (isReadingListEntry(props.entry)) return (<ReadingListEntryCard entry={props.entry} />);

    return (
        <div key={props.entry.book.id}>
            <Card className="bg-accent flex flex-col">
                <h3>{props.entry.book.title}</h3>
                <Label>By: {props.entry.book.author}</Label>
                {isClubHistoryEntry(props.entry) && (
                    <ClubHistoryEntryAdds entry={props.entry} />
                )}
            </Card>
        </div>
    )
}

type ClubHistoryEntryProps = {
    entry: ClubHistoryEntry
}

function ClubHistoryEntryAdds(props: ClubHistoryEntryProps) {
    return (
        <>
            <Label>Started: {getDateString(props.entry.started)}</Label>
            <Label>Finished: {getDateString(props.entry.finished)}</Label>
        </>
    )
}

function getDateString(date?: Date) {
    if (!date) return "N/A";

    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2); // last 2 digits

    return `${mm}/${dd}/${yy}`;
}