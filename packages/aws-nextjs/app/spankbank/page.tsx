import { CompletedBookScrollView } from "@/components/client/BookScrollView";
import { BookServiceProvider } from "@/lib/context/BookServiceContext";
import { BookService } from "@/lib/service/impl/BookServiceImpl";


/**
 * Get init books, then 
 * @returns 
 */
export default function SpankBank() {

    return (
        <BookServiceProvider service={new BookService()}>
            <div>
                <h3> The Spank Bank </h3>
            </div>
            <CompletedBookScrollView />
        </BookServiceProvider>
    )
}