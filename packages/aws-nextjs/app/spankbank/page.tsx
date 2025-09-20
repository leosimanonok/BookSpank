import { BookServiceProvider } from "@/lib/context/BookServiceContext";
import { BookService } from "@/lib/service/impl/BookServiceImpl";


/**
 * Get init books, then 
 * @returns 
 */
export default function SpankBank() {

    return (
        <BookServiceProvider service={new BookService()}>
            <></>
        </BookServiceProvider>
    )
}