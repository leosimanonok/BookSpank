import { auth, login } from "@/app/actions";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

    console.log("in login get");
    const subject = await auth();

    console.dir(subject);

    if (!subject) {
        return login();
    }
    else {
        redirect("/dashboard");
    }
}