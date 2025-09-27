import { redirect } from "next/navigation";
import { auth } from "../actions";
import { BookService } from "@/service/BookServiceImpl";

/**
 * Page that allows signed in users to add books to their list
 */
export async function Dashboard() {

    const subject = await auth();

    if (!subject) {
        redirect("/");
    }

    const bookService = new BookService();

    const LIMIT = 20;


    return (
        <div>
            <p> Dashboard for {subject.properties.username} </p>
        </div>
    )

}