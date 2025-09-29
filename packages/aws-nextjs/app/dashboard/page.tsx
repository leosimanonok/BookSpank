import { redirect } from "next/navigation";
import { auth } from "../actions";
import { BookService } from "@/service/BookServiceImpl";
import { UserBookScrollView } from "@/lib/components/client/bookScrollViews/UserBookScrollView";
import { Card } from "@/lib/components/client/base/Card";

/**
 * Page that allows signed in users to add books to their list
 */
export async function Dashboard() {

    const subject = await auth();

    if (!subject) {
        redirect("/");
    }


    return (
        <div>
            <p> Dashboard for {subject.properties.username} </p>

            <Card>
                <h2> Find new Books</h2>
                <
            </Card>

            <Card>
                <h2> Books on Your List </h2>
                <UserBookScrollView userId={subject.properties.id} />

            </Card>
        </div>
    )

}