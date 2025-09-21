// import { redirect } from "next/navigation";
// import { auth } from "../actions";
// import { BookService } from "@/service/BookService";

// /**
//  * Page that allows signed in users to add books to their list
//  */
// export async function Dashboard() {

//     const subject = await auth();

//     if (!subject) {
//         redirect("/");
//     }

//     const LIMIT = 20;

//     const books = await BookService.getUserBooks(subject.properties.id, LIMIT, 0);

// }