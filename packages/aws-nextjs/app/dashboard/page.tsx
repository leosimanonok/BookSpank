import { UserProvider } from "@/lib/context/UserContext";
import { auth, login } from "../actions";
import { Dashboard } from "@/lib/components/client/Dashboard";

/**
 * Page that allows signed in users to add books to their list
 */
export default async function DashboardPage() {

    const subject = await auth();

    if (!subject) {
        await login("/dashboard");
        return null; // next doesnt understand that login only returns redirect for some reason...
    }


    return (
        // allows access to user info in child component hooks
        <UserProvider initialUser={{ id: subject.properties.id, username: subject.properties.username }}>
            <div>
                <Dashboard />
            </div>
        </UserProvider>

    )

}