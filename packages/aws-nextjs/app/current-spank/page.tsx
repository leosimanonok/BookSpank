import { CurrentBookView } from "@/components/client/CurrentBookView";

export default function CurrentSpank() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center">Currently Spanking</h1>
                </div>
                <CurrentBookView />
            </div>
        </>
    );
}