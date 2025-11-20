import { CompletedBookScrollView } from "@/lib/components/client/bookScrollViews/ClubHistoryScrollView";

export default function SpankBank() {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div>
                    <h3 className="text-xl font-semibold mb-4"> The Spank Bank </h3>
                </div>
                <CompletedBookScrollView />
            </div>
        </>
    )
}