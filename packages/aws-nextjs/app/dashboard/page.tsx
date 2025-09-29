import { redirect } from "next/navigation";
import { auth } from "../actions";
import { UserBookScrollView } from "@/lib/components/client/bookScrollViews/UserBookScrollView";
import { Card } from "@/lib/components/client/base/Card";
import { OpenLibBookScrollView } from "@/lib/components/client/bookScrollViews/OpenLibBookScrollView";

/**
 * Page that allows signed in users to add books to their list
 */
export default async function Dashboard() {

    const subject = await auth();

    if (!subject) {
        redirect("/");
    }


    return (
        <div>
            <p> Dashboard for {subject.properties.username} </p>

            <Card className="bg-grey">
                <h2> Find new Books</h2>
                <OpenLibBookScrollView />
            </Card>

            <Card>
                <h2> Books on Your List </h2>
                <UserBookScrollView userId={subject.properties.id} />

            </Card>
        </div>
    )

}