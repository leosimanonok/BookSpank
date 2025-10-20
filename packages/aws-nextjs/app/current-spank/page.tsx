import { CurrentSpankView } from "@/client_components/CurrentSpank";
import { UserProvider } from "@/context/UserContext";
import { auth } from "@/app/actions";


export default async function CurrentSpank() {
    const subject = await auth();

    console.dir(subject);

    return (
        // allows access to user info in child component hooks
        <UserProvider initialUser={subject ? { id: subject.properties.id, username: subject.properties.username } : null}>
            <div>
                <CurrentSpankView />
            </div>
        </UserProvider>

    )
}
