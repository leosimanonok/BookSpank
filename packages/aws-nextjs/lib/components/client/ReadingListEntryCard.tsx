import { useUser } from "@/context/UserContext";
import { useReadingListService } from "@/lib/hook/useReadingListService";
import { ReadingListEntry } from "@/model/ReadingListEntry";
import { Card } from "@/client_components/base/Card";
import { Label } from "@/client_components/base/Label";
import { useState } from "react";


type props = {
    entry: ReadingListEntry;
}


export function ReadingListEntryCard({ entry }: props) {
    const { user } = useUser();
    const service = useReadingListService();

    const [currEntry, setCurrEntry] = useState<ReadingListEntry>(entry);

    const onClick = () => {
        try {
            service.updateWantToReadNext(user.id, entry.book.id, currEntry.wantToReadNext);
            setCurrEntry((prev) => ({ ...prev, wantToReadNext: !prev.wantToReadNext }));
        }
        catch (err) {
            console.error(err);
            alert("Error updating reading list...");
        }
    }

    return (
        <div key={entry.book.id}
            onClick={onClick}
        >
            <Card className={`flex flex-col bg-accent transition-colors duration-200 ${currEntry.wantToReadNext ? "border-2 border-blue-500 bg-blue-100" : ""
                }`}>
                <h3>{entry.book.title}</h3>
                <Label>By: {entry.book.author}</Label>
                <Label>Want to read next: {currEntry.wantToReadNext} </Label>
            </Card>
        </div>
    )
}