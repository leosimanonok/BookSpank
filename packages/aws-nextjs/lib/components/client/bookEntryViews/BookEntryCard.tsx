import { Card } from "@/client_components/base/Card";
import { Label } from "@/client_components/base/Label";
import { ClubHistoryEntry } from "@/model/ClubHistoryEntry";
import { IBookEntry, isClubHistoryEntry, isReadingListEntry } from "@/model/BookEntry";
import { ReadingListEntryCard } from "./ReadingListEntryCard";
import Image from "next/image";
import { OpenLibraryService } from "@/client_service/OpenLibraryServiceImpl";

type props = {
    entry: IBookEntry;
}

// TODO: I don't really like this setup, maybe we need to split all this up
// need this to use the book entry scroll view logic for pulling, since we only know entry type at runtime...
export function BookEntryCard(props: props) {

    if (isReadingListEntry(props.entry)) return (<ReadingListEntryCard entry={props.entry} />);

    return (
        <Card className="relative bg-accent flex flex-col justify-center p-4 text-center items-center ">

            <div className="mb-2">
                <h3 className="text-center bold text-2xl">{props.entry.book.title}</h3>
                <Label>Author: {props.entry.book.author}</Label>

            </div>
            {isClubHistoryEntry(props.entry) && (
                <div className="flex flex-col mb-2">
                    <ClubHistoryEntryAdds entry={props.entry} />
                </div>
            )}

            <Image className="mb-4" src={props.entry.book.cover_id ? OpenLibraryService.getCoverImageUrl(props.entry.book.cover_id, "M") : "/file.svg"}
                alt={`${props.entry.book.title}-img`}
                width={200}
                height={200}
                style={{ width: "auto", height: "200px" }}
            />
        </Card>
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