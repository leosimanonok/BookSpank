import { redirect } from "next/navigation";
import { auth } from "../actions";
import { UserBookScrollView } from "@/lib/components/client/bookScrollViews/UserBookScrollView";
import { Card } from "@/lib/components/client/base/Card";
import { OpenLibBookScrollView } from "@/lib/components/client/bookScrollViews/OpenLibBookScrollView";
import { Dashboard } from "@/lib/components/client/Dashboard";

/**
 * Page that allows signed in users to add books to their list
 */
export default async function DashboardPage() {

    const subject = await auth();

    if (!subject) {
        redirect("/");
    }


    return (
        <div>
            <Dashboard userId={subject.properties.id} username={subject.properties.username} />
        </div>
    )

}