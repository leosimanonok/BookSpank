import { useUser } from "@/context/UserContext";
import { useReadingListService } from "@/lib/hook/useReadingListService";
import { ReadingListEntry } from "@/model/ReadingListEntry";
import { Card } from "@/client_components/base/Card";
import { Label } from "@/client_components/base/Label";
import { useState } from "react";
import Image from "next/image";
import { OpenLibraryService } from "@/lib/service/client/impl/OpenLibraryServiceImpl";


type props = {
    entry: ReadingListEntry;
}


export function ReadingListEntryCard({ entry }: props) {
    const { user } = useUser();
    const service = useReadingListService();

    const [currEntry, setCurrEntry] = useState<ReadingListEntry>(entry);


    const onClick = () => {
        try {
            const updateVal = !currEntry.wantToReadNext;
            service.updateWantToReadNext(user.id, entry.book.id, updateVal);
            setCurrEntry((prev) => ({ ...prev, wantToReadNext: updateVal }));
        }
        catch (err) {
            console.error(err);
            alert("Error updating reading list...");
        }
    }

    return (
        <div onClick={onClick} >

            <Card className="relative bg-accent flex flex-col justify-center p-4 text-center items-center ">

                {/* Star in top-right with tooltip */}
                {currEntry.wantToReadNext && (
                    <div className="absolute top-2 right-2 group">
                        <span className="text-yellow-400 text-2xl">★</span>
                        <span className="absolute top-[-1.5rem] right-0 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-transform  whitespace-nowrap">
                            Want to Read Next
                        </span>
                    </div>
                )}

                <div className="mb-4">
                    <h3 className="text-center">{entry.book.title}</h3>
                    <Label>Author: {entry.book.author}</Label>
                </div>

                <Image className="mb-4" src={entry.book.cover_id ? OpenLibraryService.getCoverImageUrl(entry.book.cover_id, "M") : "/file.svg"}
                    alt={`${entry.book.title}-img`}
                    width={200}           // max width
                    height={200}          // max height
                    style={{ width: "auto", height: "200px" }}
                />
            </Card>
        </div >
    )
}